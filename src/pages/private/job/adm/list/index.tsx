import { useState } from "react";
import buscaSemResultado from "@/assets/illustrations/busca-sem-resultado.svg";
import { EmptyState } from "@/components/full/EmptyState";
import { RefreshableList } from "@/components/full/RefreshableList";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import type { ICreateJobRequest } from "@/services/types/i-job";
import { EnumUserType } from "@/services/types/i-user";
import { AppointmentCard } from "../../list/components/AppointmentCard";
import { LoadMoreButton } from "../../list/components/LoadMoreButton";
import { toDateSetParam } from "../../list/utils";
import { AppointmentFilters } from "./components/AppointmentFilters";
import { CreateAppointmentSheet } from "./components/CreateAppointmentSheet";
import { NewAppointmentButton } from "./components/NewAppointmentButton";
import type { StatusFilter } from "./constants";
import { useAdminAppointmentsList, useCreateAppointment } from "./hooks";

export function AppointmentsManagementPage() {
	const { auth } = useAuth();

	const [status, setStatus] = useState<StatusFilter>("all");
	const [dateFilter, setDateFilter] = useState("");
	const [donorName, setDonorName] = useState("");
	const [appliedDonorName, setAppliedDonorName] = useState("");
	const [nurseName, setNurseName] = useState("");
	const [appliedNurseName, setAppliedNurseName] = useState("");
	const [isCreateOpen, setIsCreateOpen] = useState(false);

	function handleApplyFilters() {
		setAppliedDonorName(donorName.trim());
		setAppliedNurseName(nurseName.trim());
	}

	function handleCreateOpenChange(open: boolean) {
		setIsCreateOpen(open);

		if (!open) createAppointment.reset();
	}

	function handleCreateAppointment(data: ICreateJobRequest) {
		createAppointment.mutate(data, {
			onSuccess: () => setIsCreateOpen(false),
		});
	}

	function handleClearFilters() {
		setStatus("all");
		setDateFilter("");
		setDonorName("");
		setAppliedDonorName("");
		setNurseName("");
		setAppliedNurseName("");
	}

	const createAppointment = useCreateAppointment();

	const {
		appointments,
		total,
		isLoading,
		isUpdating,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useAdminAppointmentsList({
		status: status === "all" ? undefined : status,
		dateSet: toDateSetParam(dateFilter),
		donorName: appliedDonorName || undefined,
		nurseName: appliedNurseName || undefined,
	});

	return (
		<Page
			hasPermission={auth?.type === EnumUserType.Admin}
			loading={isLoading}
			title="Gestão de Agendamentos"
			description="Filtre os agendamentos e clique em um card para ver os detalhes."
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={
				<div className="flex items-center gap-2.5">
					<span className="shrink-0 rounded-full bg-blue-tint px-3 py-1.5 text-[13px] font-semibold text-blue-bright">
						{total} <span className="lg:hidden">agend.</span>
						<span className="hidden lg:inline">agendamentos</span>
					</span>
					<NewAppointmentButton onClick={() => setIsCreateOpen(true)} />
				</div>
			}
		>
			<div className="-mx-4 -mt-4 -mb-16 sm:-mx-6 sm:-mt-6 flex min-h-[calc(100vh-69px)] flex-col gap-5 bg-canvas px-4 pb-24 pt-5 lg:m-0 lg:mx-auto lg:min-h-0 lg:w-full lg:max-w-[1200px] lg:gap-6 lg:bg-transparent lg:px-0 lg:pb-8 lg:pt-0">
				<AppointmentFilters
					donorName={donorName}
					onDonorNameChange={setDonorName}
					nurseName={nurseName}
					onNurseNameChange={setNurseName}
					dateFilter={dateFilter}
					onDateFilterChange={setDateFilter}
					status={status}
					onStatusChange={setStatus}
					onApply={handleApplyFilters}
					onClear={handleClearFilters}
				/>

				<RefreshableList updating={isUpdating}>
					{appointments.length === 0 ? (
						<div className="rounded-card-sm border border-line bg-surface">
							<EmptyState
								illustration={buscaSemResultado}
								title="Nenhum agendamento encontrado"
								description="Ajuste a busca ou os filtros selecionados."
							/>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
							{appointments.map((appointment, index) => (
								<div
									key={appointment.id}
									className="h-full motion-safe:surge-etapa"
									style={{ animationDelay: `${Math.min(index, 7) * 55}ms` }}
								>
									<AppointmentCard
										appointment={appointment}
										basePath="/gestao-agendamentos"
										canFillReport={false}
										highlightNurse
									/>
								</div>
							))}
						</div>
					)}
				</RefreshableList>

				{hasNextPage && (
					<LoadMoreButton
						remaining={Math.max(total - appointments.length, 0)}
						loading={isFetchingNextPage}
						onClick={() => fetchNextPage()}
					/>
				)}
			</div>

			<CreateAppointmentSheet
				open={isCreateOpen}
				onOpenChange={handleCreateOpenChange}
				onSubmit={handleCreateAppointment}
				isPending={createAppointment.isPending}
				error={
					createAppointment.isError
						? "Não foi possível criar o agendamento. Tente novamente."
						: undefined
				}
			/>
		</Page>
	);
}
