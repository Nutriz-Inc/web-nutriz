import { useState } from "react";
import { useNavigate } from "react-router-dom";
import buscaSemResultado from "@/assets/illustrations/busca-sem-resultado.svg";
import { EmptyState } from "@/components/full/EmptyState";
import { ListaDeDados } from "@/components/full/ListaDeDados";
import { RefreshableList } from "@/components/full/RefreshableList";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { ICreateJobRequest } from "@/services/types/i-job";
import { EnumUserType } from "@/services/types/i-user";
import { toDateSetParam } from "@/utils/formatter";
import { colunasDoAgendamento } from "../../list/colunas";
import { LoadMoreButton } from "../../list/components/LoadMoreButton";
import {
	AppointmentFilters,
	type CampoDoAgendamento,
} from "./components/AppointmentFilters";
import { CreateAppointmentSheet } from "./components/CreateAppointmentSheet";
import { NewAppointmentButton } from "./components/NewAppointmentButton";
import type { StatusFilter } from "./constants";
import { useAdminAppointmentsList, useCreateAppointment } from "./hooks";

export function AppointmentsManagementPage() {
	const { auth } = useAuth();
	const navigate = useNavigate();

	const [status, setStatus] = useState<StatusFilter>("all");
	const [dateFilter, setDateFilter] = useState("");
	const [campo, setCampo] = useState<CampoDoAgendamento>("doadora");
	const [termo, setTermo] = useState("");
	const [isCreateOpen, setIsCreateOpen] = useState(false);

	const termoAplicado = useDebouncedValue(termo.trim(), 400);
	const dataAplicada = toDateSetParam(dateFilter);
	const temFiltro = !!(termoAplicado || dataAplicada || status !== "all");

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
		setTermo("");
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
		dateSet: dataAplicada,
		donorName: campo === "doadora" ? termoAplicado || undefined : undefined,
		nurseName: campo === "enfermagem" ? termoAplicado || undefined : undefined,
	});

	return (
		<Page
			hasPermission={auth?.type === EnumUserType.Admin}
			loading={isLoading}
			title="Agendamentos"
			description="Abra um agendamento para ver os detalhes e o relatório."
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={
				<div className="flex items-center gap-2.5">
					<span className="shrink-0 rounded-full bg-blue-tint px-3 py-1.5 text-apoio font-semibold text-blue-bright">
						{total} <span className="lg:hidden">agend.</span>
						<span className="hidden lg:inline">agendamentos</span>
					</span>
					<NewAppointmentButton onClick={() => setIsCreateOpen(true)} />
				</div>
			}
		>
			<div className="flex flex-col gap-4 pb-24 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-5 lg:pb-8">
				<AppointmentFilters
					campo={campo}
					onCampoChange={(proximo) => {
						setCampo(proximo);
						setTermo("");
					}}
					termo={termo}
					onTermoChange={setTermo}
					dateFilter={dateFilter}
					onDateFilterChange={setDateFilter}
					status={status}
					onStatusChange={setStatus}
					temFiltro={temFiltro}
					onClear={handleClearFilters}
				/>

				<RefreshableList updating={isUpdating}>
					<ListaDeDados
						itens={appointments}
						colunas={colunasDoAgendamento({
							mostrarEnfermagem: true,
							podePreencher: false,
						})}
						chaveDoItem={(appointment) => appointment.id}
						rotuloDoItem={(appointment) =>
							`Abrir o agendamento de ${appointment.donorName}`
						}
						aoAbrir={(appointment) =>
							navigate(`/gestao-agendamentos/${appointment.id}`)
						}
						vazio={
							<EmptyState
								illustration={buscaSemResultado}
								title="Nenhum agendamento encontrado"
								description="Ajuste a busca ou os filtros selecionados."
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
