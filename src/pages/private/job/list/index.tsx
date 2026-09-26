import { useState } from "react";
import { useNavigate } from "react-router-dom";
import agendaVazia from "@/assets/illustrations/agenda-vazia.svg";
import { DateFilter } from "@/components/full/DateFilter";
import { EmptyState } from "@/components/full/EmptyState";
import { ListaDeDados } from "@/components/full/ListaDeDados";
import { ListaDeDadosEsqueleto } from "@/components/full/ListaDeDadosEsqueleto";
import { RefreshableList } from "@/components/full/RefreshableList";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumJobStatus } from "@/services/types/i-job";
import { EnumUserType } from "@/services/types/i-user";
import { toDateSetParam } from "@/utils/formatter";
import { colunasDoAgendamento } from "./colunas";
import { LoadMoreButton } from "./components/LoadMoreButton";
import { StatusTabs } from "./components/StatusTabs";
import { useAppointmentsList } from "./hooks";

export function AppointmentsPage() {
	const { auth } = useAuth();
	const navigate = useNavigate();
	const [status, setStatus] = useState<EnumJobStatus>(EnumJobStatus.Pending);
	const [dateFilter, setDateFilter] = useState("");

	const {
		appointments,
		total,
		isLoading,
		isUpdating,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useAppointmentsList({ status, dateSet: toDateSetParam(dateFilter) });

	return (
		<Page
			hasPermission={auth?.type === EnumUserType.Nurse}
			loading={isLoading}
			skeleton={<ListaDeDadosEsqueleto rotulo="Carregando os agendamentos" />}
			title="Agendamentos atribuídos"
			description="Abra um agendamento para ver os detalhes e preencher o relatório."
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={
				<span className="shrink-0 rounded-full bg-blue-tint px-3 py-1.5 text-apoio font-semibold text-blue-bright">
					{appointments.length}
					{hasNextPage ? "+" : ""} <span className="lg:hidden">agend.</span>
					<span className="hidden lg:inline">agendamentos</span>
				</span>
			}
		>
			<div className="flex flex-col gap-4 pb-24 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-5 lg:pb-8">
				<StatusTabs value={status} onChange={setStatus} />

				<div className="h-px bg-blue-tint" />

				<DateFilter value={dateFilter} onChange={setDateFilter} />

				<RefreshableList updating={isUpdating}>
					<ListaDeDados
						itens={appointments}
						colunas={colunasDoAgendamento({
							mostrarEnfermagem: false,
							podePreencher: true,
						})}
						chaveDoItem={(appointment) => appointment.id}
						rotuloDoItem={(appointment) =>
							`Abrir o agendamento de ${appointment.donorName}`
						}
						aoAbrir={(appointment) =>
							navigate(`/agendamentos/${appointment.id}`)
						}
						vazio={
							<EmptyState
								illustration={agendaVazia}
								title={
									dateFilter
										? "Nenhum agendamento nesse período"
										: status === EnumJobStatus.Pending
											? "Tudo em dia por aqui"
											: "Nenhum agendamento nesta aba"
								}
								description={
									dateFilter
										? "Escolha outra data ou limpe o filtro."
										: status === EnumJobStatus.Pending
											? "Você não tem visitas pendentes no momento."
											: "Os agendamentos aparecem aqui conforme você os conclui."
								}
							/>
						}
					/>
				</RefreshableList>

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
