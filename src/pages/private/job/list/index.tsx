import { CalendarX } from "lucide-react";
import { useState } from "react";
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
				<span className="shrink-0 rounded-full bg-[#e8f1fb] px-3 py-1.5 text-[13px] font-semibold text-[#387ccd]">
					{appointments.length}
					{hasNextPage ? "+" : ""} <span className="lg:hidden">agend.</span>
					<span className="hidden lg:inline">agendamentos</span>
				</span>
			}
		>
			<div className="-m-5 flex min-h-[calc(100vh-69px)] flex-col gap-5 bg-[#f4f7fb] px-4 pb-24 pt-5 lg:m-0 lg:mx-auto lg:min-h-0 lg:w-full lg:max-w-[1200px] lg:gap-6 lg:bg-transparent lg:px-0 lg:pb-8 lg:pt-0">
				<StatusTabs value={status} onChange={setStatus} />

				<div className="h-px bg-[#e5eaf0]" />

				<DateFilter value={dateFilter} onChange={setDateFilter} />

				{appointments.length === 0 ? (
					<div className="flex flex-col items-center gap-2 rounded-2xl border border-[#e7ecf2] bg-white p-10 text-center">
						<CalendarX className="size-8 text-[#c0c7d1]" />
						<p className="text-[15px] font-semibold text-[#1f2a37]">
							Nenhum agendamento encontrado
						</p>
						<p className="text-[13px] text-[#9ca3af]">
							Ajuste o período ou a aba selecionada.
						</p>
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
