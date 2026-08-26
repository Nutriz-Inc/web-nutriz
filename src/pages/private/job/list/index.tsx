import { useState } from "react";
import agendaVazia from "@/assets/illustrations/agenda-vazia.svg";
import { EmptyState } from "@/components/full/EmptyState";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumJobStatus } from "@/services/types/i-job";
import { EnumUserType } from "@/services/types/i-user";
import { AppointmentCard } from "./components/AppointmentCard";
import { DateFilter } from "./components/DateFilter";
import { LoadMoreButton } from "./components/LoadMoreButton";
import { StatusTabs } from "./components/StatusTabs";
import { useAppointmentsList } from "./hooks";
import { toDateSetParam } from "./utils";

export function AppointmentsPage() {
	const { auth } = useAuth();
	const [status, setStatus] = useState<EnumJobStatus>(EnumJobStatus.Pending);
	const [dateFilter, setDateFilter] = useState("");

	const {
		appointments,
		total,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useAppointmentsList({ status, dateSet: toDateSetParam(dateFilter) });

	return (
		<Page
			hasPermission={auth?.type === EnumUserType.Nurse}
			loading={isLoading}
			title="Agendamentos atribuídos"
			description="Toque ou clique em um card para ver os detalhes e o relatório da consulta."
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={
				<span className="shrink-0 rounded-full bg-blue-tint px-3 py-1.5 text-[13px] font-semibold text-blue-bright">
					{appointments.length}
					{hasNextPage ? "+" : ""} <span className="lg:hidden">agend.</span>
					<span className="hidden lg:inline">agendamentos</span>
				</span>
			}
		>
			<div className="-mx-4 -mt-4 -mb-16 sm:-mx-6 sm:-mt-6 flex min-h-[calc(100vh-69px)] flex-col gap-5 bg-canvas px-4 pb-24 pt-5 lg:m-0 lg:mx-auto lg:min-h-0 lg:w-full lg:max-w-[1200px] lg:gap-6 lg:bg-transparent lg:px-0 lg:pb-8 lg:pt-0">
				<StatusTabs value={status} onChange={setStatus} />

				<div className="h-px bg-blue-tint" />

				<DateFilter value={dateFilter} onChange={setDateFilter} />

				{appointments.length === 0 ? (
					<div className="rounded-card-sm border border-line bg-surface">
						<EmptyState
							illustration={agendaVazia}
							title="Nenhum agendamento encontrado"
							description="Ajuste o período ou a aba selecionada."
						/>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
						{appointments.map((appointment) => (
							<AppointmentCard key={appointment.id} appointment={appointment} />
						))}
					</div>
				)}

				{hasNextPage && (
					<LoadMoreButton
						remaining={Math.max(total - appointments.length, 0)}
						loading={isFetchingNextPage}
						onClick={() => fetchNextPage()}
					/>
				)}
			</div>
		</Page>
	);
}
