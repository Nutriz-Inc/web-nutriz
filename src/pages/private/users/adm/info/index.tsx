import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumJobStatus } from "@/services/types/i-job";
import { EnumUserType } from "@/services/types/i-user";
import { formatDateBR } from "@/utils/formatter";
import { CollectionAddressCard } from "./components/CollectionAddressCard";
import { ContactInfoCard } from "./components/ContactInfoCard";
import { DeactivateUserSheet } from "./components/DeactivateUserSheet";
import { HeaderStat } from "./components/HeaderStat";
import { NurseAppointmentsCard } from "./components/NurseAppointmentsCard";
import { UserDetailHeaderCard } from "./components/UserDetailHeaderCard";
import type { DonationFilter } from "./components/UserDonationsCard";
import { UserDonationsCard } from "./components/UserDonationsCard";
import {
	useAdminUserDetail,
	useNurseAppointments,
	useRemoveUser,
	useUserDonations,
} from "./hooks";
import { formatLiters, formatShortDateTime } from "./utils";

export function UserManagementDetailPage() {
	const { id_user = "" } = useParams();
	const location = useLocation();
	const backTo = location.state?.backTo ?? "/usuarios";
	const { auth } = useAuth();
	const [deactivateOpen, setDeactivateOpen] = useState(false);
	const [donationFilter, setDonationFilter] = useState<DonationFilter>("all");

	const userQuery = useAdminUserDetail(id_user);
	const user = userQuery.data;

	const removeUserMutation = useRemoveUser(id_user);

	function handleConfirmDeactivate() {
		removeUserMutation.mutate(undefined, {
			onSuccess: () => setDeactivateOpen(false),
		});
	}

	const isCommon = user?.type === EnumUserType.Common;

	const allDonationsQuery = useUserDonations(id_user, isCommon);
	const filteredDonationsQuery = useUserDonations(
		id_user,
		isCommon && donationFilter !== "all",
		donationFilter === "active",
	);
	const jobsQuery = useNurseAppointments(
		id_user,
		user?.type === EnumUserType.Nurse,
	);

	const allDonations = allDonationsQuery.data?.data ?? [];
	const donations =
		donationFilter === "all"
			? allDonations
			: (filteredDonationsQuery.data?.data ?? []);
	const jobs = jobsQuery.data?.data ?? [];

	const donationNumberById = new Map(
		[...allDonations]
			.sort((a, b) => a.created_at.localeCompare(b.created_at))
			.map((donation, index) => [donation.id_donation, index + 1] as const),
	);

	const lastDonation = allDonations.reduce<string | null>(
		(latest, donation) =>
			!latest || donation.created_at > latest ? donation.created_at : latest,
		null,
	);

	const pendingJobs = jobs.filter(
		(job) => job.status === EnumJobStatus.Pending,
	);
	const doneJobsCount = jobs.filter(
		(job) => job.status === EnumJobStatus.Done,
	).length;
	const nextAppointment = pendingJobs
		.filter((job) => Boolean(job.date_set))
		.reduce<string | null>(
			(earliest, job) =>
				!earliest || (job.date_set as string) < earliest
					? (job.date_set as string)
					: earliest,
			null,
		);

	return (
		<Page
			title="Detalhes do Usuário"
			description="Informações cadastrais e histórico do usuário na plataforma"
			backTo={backTo}
			hasPermission={auth?.type === EnumUserType.Admin}
			loading={userQuery.isLoading}
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={
				user && user.type !== EnumUserType.Common && !user.removed_at ? (
					<button
						type="button"
						onClick={() => setDeactivateOpen(true)}
						className="rounded-lg border border-[#f3caca] bg-white px-4 py-2 text-[13px] font-semibold text-[#cf3030] transition-colors hover:bg-[#fdecec]"
					>
						Desativar usuário
					</button>
				) : undefined
			}
		>
			{user && (
				<div className="-m-5 flex min-h-[calc(100vh-69px)] flex-col gap-5 bg-[#f4f7fb] p-4 lg:m-0 lg:min-h-0 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:bg-transparent lg:p-0">
					<UserDetailHeaderCard
						user={user}
						stats={
							user.type === EnumUserType.Common ? (
								<>
									<HeaderStat
										value={formatLiters(user.milk_donated ?? 0)}
										label="Total doado"
									/>
									<HeaderStat
										value={String(user.donations_completed ?? 0)}
										label="Doações concluídas"
										valueClassName="text-[#f2579f]"
									/>
									<HeaderStat
										value={lastDonation ? formatDateBR(lastDonation) : "—"}
										label="Última doação"
									/>
								</>
							) : user.type === EnumUserType.Nurse ? (
								<>
									<HeaderStat
										value={String(pendingJobs.length)}
										label="Agendamentos ativos"
									/>
									<HeaderStat
										value={String(doneJobsCount)}
										label="Concluídos"
									/>
									<HeaderStat
										value={
											nextAppointment
												? formatShortDateTime(nextAppointment)
												: "—"
										}
										label="Próximo agendamento"
									/>
								</>
							) : undefined
						}
					/>

					<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
						<ContactInfoCard user={user} />
						{user.type === EnumUserType.Common && (
							<CollectionAddressCard user={user} />
						)}
					</div>

					{user.type === EnumUserType.Common && (
						<UserDonationsCard
							donations={donations}
							numberById={donationNumberById}
							filter={donationFilter}
							onFilterChange={setDonationFilter}
							loading={
								donationFilter !== "all" && filteredDonationsQuery.isLoading
							}
						/>
					)}

					{user.type === EnumUserType.Nurse && (
						<NurseAppointmentsCard jobs={jobs} />
					)}

					<DeactivateUserSheet
						open={deactivateOpen}
						onOpenChange={(open) => {
							setDeactivateOpen(open);
							if (!open) removeUserMutation.reset();
						}}
						userName={user.name}
						onConfirm={handleConfirmDeactivate}
						isPending={removeUserMutation.isPending}
						error={
							removeUserMutation.isError
								? "Não foi possível desativar o usuário. Tente novamente."
								: undefined
						}
					/>
				</div>
			)}
		</Page>
	);
}
