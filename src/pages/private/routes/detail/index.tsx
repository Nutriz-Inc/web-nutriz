import { useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumRouteStatus, type IRouteStop } from "@/services/types/i-route";
import { EnumUserType } from "@/services/types/i-user";
import { AddStopSheet } from "./components/AddStopSheet";
import { CancelRouteSheet } from "./components/CancelRouteSheet";
import { ConfirmActionDialog } from "./components/ConfirmActionDialog";
import { EditRouteSheet } from "./components/EditRouteSheet";
import { FinishRouteSheet } from "./components/FinishRouteSheet";
import { ReportProblemSheet } from "./components/ReportProblemSheet";
import { RouteDriverActions } from "./components/RouteDriverActions";
import { RouteDriverCard } from "./components/RouteDriverCard";
import { RouteHeaderCard } from "./components/RouteHeaderCard";
import { RouteMap } from "./components/RouteMap";
import { RouteMileageCard } from "./components/RouteMileageCard";
import { RouteStartBanner } from "./components/RouteStartBanner";
import { RouteStopList } from "./components/RouteStopList";
import { RouteTimeCard } from "./components/RouteTimeCard";
import {
	useCreateRouteStop,
	useDonationStepOptions,
	useMarkStopArrival,
	useRemoveRouteStop,
	useRouteDetail,
	useRouteDriver,
	useRouteStats,
	useUpdateRoute,
} from "./hooks";
import {
	ehRotaAlteravel,
	formatarEndereco,
	mensagemDeErro,
	ordenarParadas,
} from "./utils";

type Modal =
	| "editar"
	| "cancelar"
	| "adicionar"
	| "remover"
	| "iniciar"
	| "chegar"
	| "finalizar"
	| "reportar";

export function RouteDetailPage() {
	const { id_route = "" } = useParams();
	const { auth } = useAuth();

	const [modal, setModal] = useState<Modal>();
	const [paradaSelecionada, setParadaSelecionada] = useState<IRouteStop>();
	const [erroDeAcao, setErroDeAcao] = useState<string>();

	const routeQuery = useRouteDetail(id_route);
	const route = routeQuery.data;

	const ehAdm = auth?.type === EnumUserType.Admin;
	const ehDonoDaRota =
		auth?.type === EnumUserType.Driver && route?.id_driver === auth.id_user;

	const driverQuery = useRouteDriver(route?.id_driver);
	const statsQuery = useRouteStats(Boolean(ehAdm && route));

	const stops = ordenarParadas(route?.stops ?? []);
	const paradasVisitadas = stops.filter((stop) => stop.date_start).length;
	const rotaAlteravel = route ? ehRotaAlteravel(route.status) : false;

	const podeGerenciar = Boolean(ehAdm && rotaAlteravel);
	const podeOperar = Boolean(ehDonoDaRota && rotaAlteravel);

	const podeIniciar = podeOperar && !route?.date_start;
	const podeMarcarParada = podeOperar && Boolean(route?.date_start);
	const podeFinalizar =
		podeOperar && Boolean(route?.date_start) && paradasVisitadas > 0;

	const updateMutation = useUpdateRoute(id_route);
	const createStopMutation = useCreateRouteStop(id_route);
	const removeStopMutation = useRemoveRouteStop(id_route);
	const markArrivalMutation = useMarkStopArrival(id_route);

	const opcoesQuery = useDonationStepOptions({
		enabled: modal === "adicionar" && podeGerenciar,
		city: route?.city,
		neighborhood: route?.neighborhood,
	});

	const idsJaNaRota = new Set(stops.map((stop) => stop.id_donation_step));
	const opcoesDisponiveis = (opcoesQuery.data?.data ?? []).filter(
		(step) => !idsJaNaRota.has(step.id_donation_step),
	);

	function fecharModal() {
		setModal(undefined);
		setParadaSelecionada(undefined);
		setErroDeAcao(undefined);
	}

	async function executar(acao: () => Promise<unknown>) {
		setErroDeAcao(undefined);

		try {
			await acao();
			fecharModal();
		} catch (erro) {
			setErroDeAcao(mensagemDeErro(erro));
		}
	}

	if (routeQuery.isError) {
		return (
			<Page
				title="Rota"
				hasPermission={auth?.type !== EnumUserType.Common}
				backTo="/rotas"
			>
				<div className="flex flex-col items-center gap-3 rounded-2xl bg-surface p-6 text-center shadow-soft">
					<p className="text-[14px] text-ink-2">
						Não foi possível carregar esta rota.
					</p>
					<button
						type="button"
						onClick={() => routeQuery.refetch()}
						className="h-11 rounded-full border-[1.5px] border-blue-deep px-5 text-[14px] font-semibold text-blue-deep transition-colors hover:bg-blue-tint"
					>
						Tentar novamente
					</button>
				</div>
			</Page>
		);
	}

	return (
		<Page
			title={route?.name ?? "Rota"}
			description="Acompanhe o trajeto, as paradas e o andamento da rota."
			hasPermission={auth?.type !== EnumUserType.Common}
			loading={routeQuery.isLoading}
			backTo="/rotas"
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
		>
			{route && (
				<div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 lg:gap-6">
					{podeOperar && !route.date_start && (
						<RouteStartBanner dateSet={route.date_set} />
					)}

					<div className="flex flex-col gap-4 lg:grid lg:grid-cols-[380px_1fr] lg:items-start lg:gap-6">
						<div className="flex flex-col gap-4 lg:gap-6">
							<RouteHeaderCard
								route={route}
								podeGerenciar={podeGerenciar}
								onEditar={() => setModal("editar")}
								onCancelar={() => setModal("cancelar")}
							/>

							<RouteTimeCard
								dateStart={route.date_start}
								dateEnd={route.date_end}
							/>

							<RouteDriverCard
								driverName={route.driver_name}
								driver={driverQuery.data}
								carregando={driverQuery.isLoading}
							/>

							<RouteMileageCard
								mileage={route.mileage}
								mediaPorRota={
									ehAdm
										? (statsQuery.data?.average_mileage_per_route ?? null)
										: null
								}
							/>
						</div>

						<div className="flex flex-col gap-4 lg:gap-6">
							<RouteMap
								stops={stops}
								className="h-[240px] w-full overflow-hidden rounded-2xl shadow-soft lg:h-[420px] lg:rounded-3xl"
							/>

							<RouteStopList
								stops={stops}
								podeGerenciar={podeGerenciar}
								podeMarcar={podeMarcarParada}
								onAdicionar={() => setModal("adicionar")}
								onRemover={(stop) => {
									setParadaSelecionada(stop);
									setModal("remover");
								}}
								onMarcar={(stop) => {
									setParadaSelecionada(stop);
									setModal("chegar");
								}}
							/>

							{podeOperar && (
								<RouteDriverActions
									podeIniciar={podeIniciar}
									podeFinalizar={podeFinalizar}
									podeReportar={
										route.status === EnumRouteStatus.Pending ||
										route.status === EnumRouteStatus.InProgress
									}
									onIniciar={() => setModal("iniciar")}
									onFinalizar={() => setModal("finalizar")}
									onReportar={() => setModal("reportar")}
								/>
							)}
						</div>
					</div>

					<EditRouteSheet
						open={modal === "editar"}
						onOpenChange={(aberto) => (aberto ? undefined : fecharModal())}
						nomeAtual={route.name}
						descricaoAtual={route.description}
						salvando={updateMutation.isPending}
						erro={erroDeAcao}
						onSubmit={(dados) =>
							executar(() => updateMutation.mutateAsync(dados))
						}
					/>

					<CancelRouteSheet
						open={modal === "cancelar"}
						onOpenChange={(aberto) => (aberto ? undefined : fecharModal())}
						salvando={updateMutation.isPending}
						erro={erroDeAcao}
						onConfirmar={(motivo) =>
							executar(() =>
								updateMutation.mutateAsync({
									status: EnumRouteStatus.Canceled,
									description: motivo,
								}),
							)
						}
					/>

					<AddStopSheet
						open={modal === "adicionar"}
						onOpenChange={(aberto) => (aberto ? undefined : fecharModal())}
						opcoes={opcoesDisponiveis}
						carregando={opcoesQuery.isLoading}
						salvando={createStopMutation.isPending}
						erro={erroDeAcao}
						onConfirmar={(id_donation_step) =>
							executar(() =>
								createStopMutation.mutateAsync({ id_donation_step }),
							)
						}
					/>

					<ConfirmActionDialog
						open={modal === "remover"}
						onOpenChange={(aberto) => (aberto ? undefined : fecharModal())}
						titulo="Remover esta parada?"
						descricao={
							paradaSelecionada
								? `A parada em ${formatarEndereco(paradaSelecionada)} sai do trajeto e a ordem das demais é recalculada.`
								: ""
						}
						rotuloConfirmar="Remover parada"
						tom="perigo"
						carregando={removeStopMutation.isPending}
						erro={erroDeAcao}
						onConfirmar={() =>
							paradaSelecionada &&
							executar(() =>
								removeStopMutation.mutateAsync(
									paradaSelecionada.id_route_donation_step,
								),
							)
						}
					/>

					<ConfirmActionDialog
						open={modal === "iniciar"}
						onOpenChange={(aberto) => (aberto ? undefined : fecharModal())}
						titulo="Confirma o início da rota?"
						descricao="O horário de início é registrado agora e o contador de 6 horas começa a correr."
						rotuloConfirmar="Iniciar rota"
						carregando={updateMutation.isPending}
						erro={erroDeAcao}
						onConfirmar={() =>
							executar(() => updateMutation.mutateAsync({ date_start: true }))
						}
					/>

					<ConfirmActionDialog
						open={modal === "chegar"}
						onOpenChange={(aberto) => (aberto ? undefined : fecharModal())}
						titulo="Confirma a chegada nesta parada?"
						descricao={
							paradaSelecionada
								? `O horário de chegada em ${formatarEndereco(paradaSelecionada)} é registrado agora.`
								: ""
						}
						rotuloConfirmar="Confirmar chegada"
						carregando={markArrivalMutation.isPending}
						erro={erroDeAcao}
						onConfirmar={() =>
							paradaSelecionada &&
							executar(() =>
								markArrivalMutation.mutateAsync(
									paradaSelecionada.id_route_donation_step,
								),
							)
						}
					/>

					<FinishRouteSheet
						open={modal === "finalizar"}
						onOpenChange={(aberto) => (aberto ? undefined : fecharModal())}
						duracaoMs={
							route.date_start
								? Date.now() - new Date(route.date_start).getTime()
								: 0
						}
						totalParadas={stops.length}
						paradasVisitadas={paradasVisitadas}
						salvando={updateMutation.isPending}
						erro={erroDeAcao}
						onConfirmar={(dados) =>
							executar(() =>
								updateMutation.mutateAsync({ date_end: true, ...dados }),
							)
						}
					/>

					<ReportProblemSheet
						open={modal === "reportar"}
						onOpenChange={(aberto) => (aberto ? undefined : fecharModal())}
						salvando={updateMutation.isPending}
						erro={erroDeAcao}
						onConfirmar={(relato) =>
							executar(() =>
								updateMutation.mutateAsync({
									status: EnumRouteStatus.Error,
									user_feedback: relato,
								}),
							)
						}
					/>
				</div>
			)}
		</Page>
	);
}
