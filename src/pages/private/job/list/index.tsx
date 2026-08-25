import { useState } from "react";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { DateFilter } from "./components/DateFilter";
import { KanbanColumn } from "./components/KanbanColumn";
import { COLUNAS_DO_QUADRO } from "./constants";
import { useAppointmentsList } from "./hooks";
import { toDateSetParam } from "./utils";

/**
 * Agendamentos do enfermeiro, num quadro de tres colunas.
 *
 * Antes era uma aba por status e uma grade de cartoes: so dava para ver um
 * status de cada vez, e a pergunta que o enfermeiro faz ao abrir a tela —
 * "quanto falta e o que ja saiu" — exigia trocar de aba. As colunas sao os tres
 * `EnumJobStatus` que a API ja tem; o quadro nao inventa estado nenhum.
 *
 * Nao ha arrastar cartao entre colunas de proposito: mudar de status aqui exige
 * o relatorio da consulta, que e preenchido na tela de detalhe. Um arrasto
 * pularia essa etapa. O quadro mostra e leva para la; quem muda o estado e o
 * formulario.
 */
export function AppointmentsPage() {
	const { auth } = useAuth();
	const [dateFilter, setDateFilter] = useState("");
	const dateSet = toDateSetParam(dateFilter);

	// Uma consulta por coluna: o hook ja pagina por status, entao cada coluna
	// carrega e pagina sozinha.
	const pendentes = useAppointmentsList({
		status: COLUNAS_DO_QUADRO[0].status,
		dateSet,
	});
	const concluidos = useAppointmentsList({
		status: COLUNAS_DO_QUADRO[1].status,
		dateSet,
	});
	const comErro = useAppointmentsList({
		status: COLUNAS_DO_QUADRO[2].status,
		dateSet,
	});

	const consultas = [pendentes, concluidos, comErro];
	const totalGeral = consultas.reduce(
		(soma, consulta) => soma + consulta.total,
		0,
	);
	const carregandoTudo = consultas.every((consulta) => consulta.isLoading);

	return (
		<Page
			hasPermission={auth?.type === EnumUserType.Nurse}
			title="Agendamentos atribuídos"
			description="Cada coluna é um estado do agendamento. Toque em um card para ver os detalhes e o relatório."
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={
				<span className="shrink-0 rounded-full bg-blue-tint px-3 py-1.5 text-[13px] font-semibold text-blue-bright">
					{carregandoTudo ? "—" : totalGeral}{" "}
					<span className="lg:hidden">agend.</span>
					<span className="hidden lg:inline">agendamentos</span>
				</span>
			}
		>
			<div className="flex flex-col gap-5 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-6">
				<DateFilter value={dateFilter} onChange={setDateFilter} />

				{/*
				 * No celular as colunas viram um carrossel que encaixa: 84vw cada uma
				 * deixa a proxima aparecendo pela borda, que e o que avisa que ha mais
				 * coluna para o lado. De `lg` para cima elas dividem a largura.
				 */}
				<div className="sem-barra -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
					{COLUNAS_DO_QUADRO.map((coluna, indice) => {
						const consulta = consultas[indice];

						return (
							<KanbanColumn
								key={coluna.status}
								coluna={coluna}
								appointments={consulta.appointments}
								total={consulta.total}
								isLoading={consulta.isLoading}
								hasNextPage={consulta.hasNextPage}
								isFetchingNextPage={consulta.isFetchingNextPage}
								onLoadMore={() => consulta.fetchNextPage()}
							/>
						);
					})}
				</div>
			</div>
		</Page>
	);
}
