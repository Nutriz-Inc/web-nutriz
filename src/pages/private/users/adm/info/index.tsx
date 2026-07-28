import { useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumJobStatus } from "@/services/types/i-job";
import { EnumUserType } from "@/services/types/i-user";
import { formatDateBR } from "@/utils/formatter";
import { AccessInfoCard } from "./components/AccessInfoCard";
import { BabiesCard } from "./components/BabiesCard";
import { CollectionAddressCard } from "./components/CollectionAddressCard";
import { ContactInfoCard } from "./components/ContactInfoCard";
import { DeactivateUserSheet } from "./components/DeactivateUserSheet";
import { HeaderStat } from "./components/HeaderStat";
import { NurseAppointmentsCard } from "./components/NurseAppointmentsCard";
import { UserDetailHeaderCard } from "./components/UserDetailHeaderCard";
import { UserDonationsCard } from "./components/UserDonationsCard";
import {
	useAdminUserDetail,
	useNurseAppointments,
	useRemoveUser,
	useUserDonations,
} from "./hooks";
import {
	formatLiters,
	formatShortDateTime,
	formatTimeOnPlatform,
} from "./utils";

export function UserManagementDetailPage() {
	const { id_user = "" } = useParams();
	const { auth } = useAuth();
	const [deactivateOpen, setDeactivateOpen] = useState(false);

	const userQuery = useAdminUserDetail(id_user);
	const user = userQuery.data;

	const removeUserMutation = useRemoveUser(id_user);

	function handleConfirmDeactivate() {
		removeUserMutation.mutate(undefined, {
			onSuccess: () => setDeactivateOpen(false),
		});
	}

	const donationsQuery = useUserDonations(
		id_user,
		user?.type === EnumUserType.Common,
	);
	const jobsQuery = useNurseAppointments(
		id_user,
		user?.type === EnumUserType.Nurse,
	);

	const donations = donationsQuery.data?.data ?? [];
	const jobs = jobsQuery.data?.data ?? [];

	const lastDonation = donations.reduce<string | null>(
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
			hasPermission={auth?.type === EnumUserType.Admin}
			loading={userQuery.isLoading}
		>
			{user && (
				<div className="-m-5 flex min-h-[calc(100vh-69px)] flex-col gap-5 bg-[#f4f7fb] p-4 lg:m-0 lg:min-h-0 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:bg-transparent lg:p-0">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<p className="text-[13px] text-[#9ca3af]">
							{user.type === EnumUserType.Common ? "Doadoras" : "Usuários"} /{" "}
							<span className="font-semibold text-[#1f2a37]">{user.name}</span>
						</p>
						{user.type !== EnumUserType.Common && !user.removed_at && (
							<button
								type="button"
								onClick={() => setDeactivateOpen(true)}
								className="rounded-lg border border-[#f3caca] bg-white px-4 py-2 text-[13px] font-semibold text-[#cf3030] transition-colors hover:bg-[#fdecec]"
							>
								Desativar usuário
							</button>
						)}
					</div>

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
							) : (
								<HeaderStat
									value={formatTimeOnPlatform(user.created_at)}
									label="Na plataforma"
								/>
							)
						}
					/>

					<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
						<ContactInfoCard user={user} />
						{user.type === EnumUserType.Common ? (
							<CollectionAddressCard user={user} />
						) : (
							<AccessInfoCard user={user} />
						)}
					</div>

					{user.type === EnumUserType.Common && (
						<>
							<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
								<BabiesCard babies={user.babies ?? []} />
							</div>
							<UserDonationsCard donations={donations} />
						</>
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
