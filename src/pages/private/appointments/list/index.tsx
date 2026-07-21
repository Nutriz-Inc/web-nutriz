import { CalendarX } from "lucide-react";
import { useState } from "react";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { AppointmentCard } from "./components/AppointmentCard";
import { DateFilter } from "./components/DateFilter";
import { StatusTabs } from "./components/StatusTabs";
import { useAppointmentsList } from "./hooks";
import { type AppointmentTab, filterAppointments } from "./utils";

export function AppointmentsPage() {
	const { auth } = useAuth();
	const { data, isLoading } = useAppointmentsList();

	const [tab, setTab] = useState<AppointmentTab>("andamento");
	const [dateFilter, setDateFilter] = useState("");

	const appointments = data ?? [];
	const filtered = filterAppointments(appointments, tab, dateFilter);

	return (
		<Page hasPermission={auth?.type === EnumUserType.Nurse} loading={isLoading}>
			<div className="-m-5 flex min-h-[calc(100vh-69px)] flex-col gap-5 bg-[#f4f7fb] px-4 pb-24 pt-5 lg:m-0 lg:mx-auto lg:min-h-0 lg:w-full lg:max-w-[1200px] lg:gap-6 lg:bg-transparent lg:px-0 lg:pb-8 lg:pt-0">
				<div className="flex flex-col gap-4">
					<div className="flex items-start justify-between gap-3">
						<div className="flex flex-col gap-1">
							<h1 className="text-[22px] font-extrabold text-[#0e2a45] lg:text-[26px]">
								Agendamentos atribuídos
							</h1>
							<p className="text-[13px] text-[#8a97a8] lg:text-[14px]">
								<span className="lg:hidden">Toque</span>
								<span className="hidden lg:inline">Clique</span> em um card para
								ver os detalhes e o relatório da consulta.
							</p>
						</div>
						<span className="shrink-0 rounded-full bg-[#e8f1fb] px-3 py-1.5 text-[13px] font-semibold text-[#387ccd]">
							{filtered.length} <span className="lg:hidden">agend.</span>
							<span className="hidden lg:inline">agendamentos</span>
						</span>
					</div>

					<StatusTabs value={tab} onChange={setTab} />
				</div>

				<div className="h-px bg-[#e5eaf0]" />

				<DateFilter value={dateFilter} onChange={setDateFilter} />

				{filtered.length === 0 ? (
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
						{filtered.map((appointment) => (
							<AppointmentCard key={appointment.id} appointment={appointment} />
						))}
					</div>
				)}
			</div>
		</Page>
	);
}
