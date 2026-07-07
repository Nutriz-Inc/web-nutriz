import { useState } from "react";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { BabySection } from "./components/BabySection";
import { BottomActionBar } from "./components/BottomActionBar";
import {
	type MyDataFormValues,
	MyDataSection,
} from "./components/MyDataSection";
import type { BabyDraft } from "./components/NewBabyCard";
import { ProfileHeader } from "./components/ProfileHeader";
import { type ProfileTabKey, ProfileTabs } from "./components/ProfileTabs";
import {
	useCreateBaby,
	useQueryProfile,
	useSaveAddress,
	useUpdateBaby,
	useUpdateProfile,
} from "./hooks";

function createDraft(): BabyDraft {
	return { key: crypto.randomUUID(), name: "", birth_date: "", gender: null };
}

export function ProfilePage() {
	const { auth } = useAuth();
	const { data, isLoading } = useQueryProfile(auth?.id_user);

	const [tab, setTab] = useState<ProfileTabKey>("dados");
	const [myData, setMyData] = useState<MyDataFormValues | null>(null);
	const [babyNames, setBabyNames] = useState<Record<string, string>>({});
	const [drafts, setDrafts] = useState<BabyDraft[]>([]);

	const updateProfile = useUpdateProfile(auth?.id_user);
	const saveAddress = useSaveAddress(auth?.id_user);
	const updateBaby = useUpdateBaby(auth?.id_user);
	const createBaby = useCreateBaby(auth?.id_user);

	const address = data?.addresses?.[0];
	const babies = data?.babies ?? [];

	const values: MyDataFormValues = myData ?? {
		name: data?.name ?? "",
		phone_number: data?.phone_number ?? "",
		zip_code: address?.zipcode ?? "",
		number: address?.number ?? "",
		complement: address?.complement ?? "",
	};

	const resolvedBabyNames = babies.reduce<Record<string, string>>(
		(acc, baby) => {
			acc[baby.id_user_baby] = babyNames[baby.id_user_baby] ?? baby.name ?? "";
			return acc;
		},
		{},
	);

	function handleAddDraft() {
		setDrafts((prev) => [...prev, createDraft()]);
	}

	function handleChangeDraft(next: BabyDraft) {
		setDrafts((prev) =>
			prev.map((draft) => (draft.key === next.key ? next : draft)),
		);
	}

	function handleRemoveDraft(key: string) {
		setDrafts((prev) => prev.filter((draft) => draft.key !== key));
	}

	function handleCancel() {
		setMyData(null);
		setBabyNames({});
		setDrafts([]);
	}

	async function handleSave() {
		if (!auth?.id_user) return;

		if (tab === "dados") {
			await updateProfile.mutateAsync({
				name: values.name,
				phone_number: values.phone_number,
			});

			const zipDigits = values.zip_code.replace(/\D/g, "");

			if (zipDigits.length === 8) {
				await saveAddress.mutateAsync({
					id_address: address?.id_address,
					data: {
						zip_code: zipDigits,
						number: values.number || undefined,
						complement: values.complement || undefined,
					},
				});
			}

			return;
		}

		await Promise.all([
			...Object.entries(babyNames).map(([id_user_baby, name]) =>
				updateBaby.mutateAsync({ id_user_baby, data: { name } }),
			),
			...drafts
				.filter((draft) => draft.name && draft.birth_date)
				.map((draft) =>
					createBaby.mutateAsync({
						name: draft.name,
						birth_date: draft.birth_date,
					}),
				),
		]);

		setDrafts([]);
	}

	const saving =
		updateProfile.isPending ||
		saveAddress.isPending ||
		updateBaby.isPending ||
		createBaby.isPending;

	return (
		<Page loading={isLoading}>
			<div className="-m-5 flex min-h-[calc(100vh-69px)] flex-col bg-[#f7f9fb]">
				<ProfileHeader name={data?.name ?? ""} email={data?.email ?? ""} />

				<div className="border-b border-[#888]/12 px-4 py-3">
					<ProfileTabs value={tab} onChange={setTab} />
				</div>

				<div className="flex-1 px-3 py-4">
					{tab === "dados" ? (
						<MyDataSection
							values={values}
							onChange={setMyData}
							birthDate={
								data?.birth_date
									? new Date(data.birth_date).toLocaleDateString("pt-BR")
									: ""
							}
							email={data?.email ?? ""}
							street={address?.street ?? ""}
						/>
					) : (
						<BabySection
							babies={babies}
							babyNames={resolvedBabyNames}
							onChangeBabyName={(id, name) =>
								setBabyNames((prev) => ({ ...prev, [id]: name }))
							}
							drafts={drafts}
							onAddDraft={handleAddDraft}
							onChangeDraft={handleChangeDraft}
							onRemoveDraft={handleRemoveDraft}
						/>
					)}
				</div>

				<BottomActionBar
					onSave={handleSave}
					onCancel={handleCancel}
					saving={saving}
				/>
			</div>
		</Page>
	);
}
