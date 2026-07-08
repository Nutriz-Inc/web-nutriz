/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
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
import { createDraft } from "./utils";

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

	const baselineValues: MyDataFormValues = {
		name: data?.name ?? "",
		phone_number: data?.phone_number ?? "",
		email: data?.email ?? "",
		password: "",
		zip_code: address?.zipcode ?? "",
		number: address?.number ?? "",
		complement: address?.complement ?? "",
	};

	const values: MyDataFormValues = myData ?? baselineValues;

	const hasUserChanges =
		myData !== null &&
		(values.name !== baselineValues.name ||
			values.phone_number !== baselineValues.phone_number ||
			values.email !== baselineValues.email ||
			values.password !== "");

	const hasAddressChanges =
		myData !== null &&
		(values.zip_code !== baselineValues.zip_code ||
			values.number !== baselineValues.number ||
			values.complement !== baselineValues.complement);

	const hasDadosChanges = hasUserChanges || hasAddressChanges;

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

	const hasBabyChanges =
		Object.keys(babyNames).length > 0 ||
		Object.keys(babyBirthDates).length > 0 ||
		drafts.length > 0;

	const hasChanges = tab === "dados" ? hasDadosChanges : hasBabyChanges;

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
			const requests: Promise<unknown>[] = [];

			if (hasUserChanges) {
				requests.push(
					updateProfile.mutateAsync({
						name: values.name,
						phone_number: values.phone_number,
						email: values.email,
						password: values.password || undefined,
					}),
				);
			}

			if (hasAddressChanges) {
				const zipDigits = values.zip_code.replace(/\D/g, "");
				const canSaveAddress = !!address?.id_address || zipDigits.length === 8;

				if (canSaveAddress) {
					requests.push(
						saveAddress.mutateAsync({
							id_address: address?.id_address,
							data: {
								zip_code: zipDigits.length === 8 ? zipDigits : undefined,
								number: values.number || undefined,
								complement: values.complement || undefined,
							},
						}),
					);
				}
			}

			await Promise.all(requests);

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
		<Page
			loading={isLoading}
			hasPermission={auth?.type === EnumUserType.Common}
			title="Perfil"
			description="Gerencie suas informações pessoais e de seu bebê."
		>
			<div className="-m-5 flex min-h-[calc(100vh-69px)] flex-col bg-[#f7f9fb] lg:m-0 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:px-8 lg:py-8">
				<div className="lg:mb-5 lg:flex lg:items-center lg:justify-between lg:gap-6 lg:rounded-2xl lg:border lg:border-[#e3eaf2] lg:bg-white lg:p-6">
					<ProfileHeader name={data?.name ?? ""} email={data?.email ?? ""} />

					<div className="border-b border-[#888]/12 px-4 py-3 lg:shrink-0 lg:border-none lg:p-0">
						<ProfileTabs value={tab} onChange={setTab} />
					</div>
				</div>

				<div className="flex-1 px-3 py-4 lg:px-0 lg:py-0">
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

				{hasChanges && (
					<BottomActionBar
						onSave={handleSave}
						onCancel={handleCancel}
						saving={saving}
					/>
				)}
			</div>
		</Page>
	);
}
