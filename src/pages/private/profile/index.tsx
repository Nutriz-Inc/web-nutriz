import { useState } from "react";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { formatDateBR } from "@/utils/formatter";
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
	useRemoveBaby,
	useSaveAddress,
	useUpdateBaby,
	useUpdateProfile,
} from "./hooks";

function createDraft(): BabyDraft {
	return { key: crypto.randomUUID(), name: "", birth_date: "" };
}

export function ProfilePage() {
	const { auth } = useAuth();
	const { data, isLoading } = useQueryProfile(auth?.id_user);

	const [tab, setTab] = useState<ProfileTabKey>("dados");
	const [myData, setMyData] = useState<MyDataFormValues | null>(null);
	const [babyNames, setBabyNames] = useState<Record<string, string>>({});
	const [babyBirthDates, setBabyBirthDates] = useState<Record<string, string>>(
		{},
	);
	const [drafts, setDrafts] = useState<BabyDraft[]>([]);

	const updateProfile = useUpdateProfile(auth?.id_user);
	const saveAddress = useSaveAddress(auth?.id_user);
	const updateBaby = useUpdateBaby(auth?.id_user);
	const createBaby = useCreateBaby(auth?.id_user);
	const removeBaby = useRemoveBaby(auth?.id_user);

	const address = data?.addresses?.[0];
	const babies = data?.babies ?? [];

	const values: MyDataFormValues = myData ?? {
		name: data?.name ?? "",
		phone_number: data?.phone_number ?? "",
		email: data?.email ?? "",
		password: "",
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

	const resolvedBabyBirthDates = babies.reduce<Record<string, string>>(
		(acc, baby) => {
			acc[baby.id_user_baby] =
				babyBirthDates[baby.id_user_baby] ??
				baby.birth_date?.slice(0, 10) ??
				"";
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

	async function handleRemoveBaby(id_user_baby: string) {
		await removeBaby.mutateAsync(id_user_baby);

		setBabyNames((prev) => {
			const { [id_user_baby]: _removed, ...rest } = prev;
			return rest;
		});
		setBabyBirthDates((prev) => {
			const { [id_user_baby]: _removed, ...rest } = prev;
			return rest;
		});
	}

	function handleCancel() {
		setMyData(null);
		setBabyNames({});
		setBabyBirthDates({});
		setDrafts([]);
	}

	async function handleSave() {
		if (!auth?.id_user) return;

		if (tab === "dados") {
			await updateProfile.mutateAsync({
				name: values.name,
				phone_number: values.phone_number,
				email: values.email,
				password: values.password || undefined,
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

			setMyData(null);
			return;
		}

		const touchedBabyIds = new Set([
			...Object.keys(babyNames),
			...Object.keys(babyBirthDates),
		]);

		await Promise.all([
			...Array.from(touchedBabyIds).map((id_user_baby) =>
				updateBaby.mutateAsync({
					id_user_baby,
					data: {
						name: resolvedBabyNames[id_user_baby],
						birth_date: resolvedBabyBirthDates[id_user_baby],
					},
				}),
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

		setBabyNames({});
		setBabyBirthDates({});
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
							birthDate={data?.birth_date ? formatDateBR(data.birth_date) : ""}
							street={address?.street ?? ""}
						/>
					) : (
						<BabySection
							babies={babies}
							babyNames={resolvedBabyNames}
							onChangeBabyName={(id, name) =>
								setBabyNames((prev) => ({ ...prev, [id]: name }))
							}
							babyBirthDates={resolvedBabyBirthDates}
							onChangeBabyBirthDate={(id, birthDate) =>
								setBabyBirthDates((prev) => ({ ...prev, [id]: birthDate }))
							}
							onRemoveBaby={handleRemoveBaby}
							removingBabyId={
								removeBaby.isPending ? removeBaby.variables : undefined
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
