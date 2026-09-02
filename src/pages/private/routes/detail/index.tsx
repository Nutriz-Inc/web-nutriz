import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionLabel } from "@/components/full/SectionLabel";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumRouteStatus, type IRouteStop } from "@/services/types/i-route";
import { EnumUserType } from "@/services/types/i-user";
import { AddStopSheet } from "./components/AddStopSheet";
import { CancelRouteSheet } from "./components/CancelRouteSheet";
import { ConfirmActionDialog } from "./components/ConfirmActionDialog";
import { EditRouteSheet } from "./components/EditRouteSheet";
import { FinishRouteSheet } from "./components/FinishRouteSheet";
import { OpenInMapsButton } from "./components/OpenInMapsButton";
import { ReportProblemSheet } from "./components/ReportProblemSheet";
import {
	type EstadoCheckIn,
	RouteCheckInButton,
} from "./components/RouteCheckInButton";
import { RouteDriverActions } from "./components/RouteDriverActions";
import { RouteDriverCard } from "./components/RouteDriverCard";
import { RouteHeaderCard } from "./components/RouteHeaderCard";
import { RouteHistoryStrip } from "./components/RouteHistoryStrip";
import { RouteMapCard } from "./components/RouteMapCard";
import { RouteMetricsBar } from "./components/RouteMetricsBar";
import { RouteStartBanner } from "./components/RouteStartBanner";
import { RouteStopList } from "./components/RouteStopList";
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
	const [estadoCheckIn, setEstadoCheckIn] = useState<EstadoCheckIn>("pronto");

	const handleEstadoCheckIn = useCallback(
		(proximo: EstadoCheckIn) => setEstadoCheckIn(proximo),
		[],
	);

	const routeQuery = useRouteDetail(id_route);
	const route = routeQuery.data;

	const ehAdm = auth?.type === EnumUserType.Admin;
	const ehDonoDaRota =
		auth?.type === EnumUserType.Driver && route?.id_driver === auth.id_user;

	const driverQuery = useRouteDriver(route?.id_driver);
	const statsQuery = useRouteStats(Boolean(ehAdm && route));

	const stops = ordenarParadas(route?.stops ?? []);
	const paradasVisitadas = stops.filter((stop) => stop.date_start).length;
	const inicioCadeiaFria = stops
		.map((stop) => stop.date_start)
		.filter((data): data is string => Boolean(data))
		.sort()
		.at(0);
	const rotaAlteravel = route ? ehRotaAlteravel(route.status) : false;

	const podeGerenciar = Boolean(ehAdm && rotaAlteravel);
	const podeOperar = Boolean(ehDonoDaRota && rotaAlteravel);

	const podeIniciar = podeOperar && !route?.date_start;
	const podeMarcarParada = podeOperar && Boolean(route?.date_start);
	const podeFinalizar =
		podeOperar && Boolean(route?.date_start) && paradasVisitadas > 0;
	const mostrarCheckIn =
		estadoCheckIn !== "oculto" &&
		(podeIniciar || estadoCheckIn !== "pronto") &&
		Boolean(ehDonoDaRota);
	const podeReportar =
		podeOperar &&
		(route?.status === EnumRouteStatus.Pending ||
			route?.status === EnumRouteStatus.InProgress);

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
				<div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
					{podeOperar && !route.date_start && (
						<RouteStartBanner dateSet={route.date_set} />
					)}

					<div
						style={{ animationDelay: "40ms" }}
						className="flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-soft motion-safe:surge-etapa"
					>
						<div className="order-2 border-t border-line xl:order-1 xl:border-t-0">
							<RouteMetricsBar
								inicioCadeiaFria={inicioCadeiaFria}
								dateEnd={route.date_end}
								mileage={route.mileage}
								mediaPorRota={
									ehAdm
										? (statsQuery.data?.average_mileage_per_route ?? null)
										: null
								}
								totalParadas={stops.length}
								paradasVisitadas={paradasVisitadas}
							/>
						</div>

						<div className="order-1 grid xl:order-2 xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)_minmax(0,360px)] xl:border-t xl:border-line">
							<div className="order-3 flex flex-col border-t border-line xl:order-none xl:border-r xl:border-t-0">
								<div className="flex flex-col">
									<SectionLabel className="px-5 pt-5">Rota</SectionLabel>
									<RouteHeaderCard
										route={route}
										podeGerenciar={podeGerenciar}
										onEditar={() => setModal("editar")}
										onCancelar={() => setModal("cancelar")}
									/>
								</div>

								<div className="flex flex-col border-t border-line">
									<SectionLabel className="px-5 pt-5">Motorista</SectionLabel>
									<RouteDriverCard
										driverName={route.driver_name}
										driver={driverQuery.data}
										carregando={driverQuery.isLoading}
									/>
								</div>

								{podeReportar && (
									<div className="mt-auto flex justify-center border-t border-line p-5">
										<RouteDriverActions
											variante="topo"
											podeIniciar={false}
											podeFinalizar={false}
											podeReportar
											onIniciar={() => setModal("iniciar")}
											onFinalizar={() => setModal("finalizar")}
											onReportar={() => setModal("reportar")}
										/>
									</div>
								)}
							</div>

							<div className="order-1 flex flex-col gap-3 p-5 xl:order-none">
								<SectionLabel trailing={<OpenInMapsButton stops={stops} />}>
									Trajeto
								</SectionLabel>

								<RouteMapCard
									stops={stops}
									desfocado={
										mostrarCheckIn &&
										(estadoCheckIn === "pronto" || estadoCheckIn === "enviando")
									}
									overlay={
										mostrarCheckIn ? (
											<RouteCheckInButton
												erro={erroDeAcao}
												onEstadoChange={handleEstadoCheckIn}
												onIniciar={() =>
													updateMutation.mutateAsync({ date_start: true })
												}
											/>
										) : undefined
									}
								/>

								<p className="text-[12px] leading-relaxed text-ink-2">
									Traçado ilustrativo. Início, chegadas e finalização continuam
									sendo registrados aqui no sistema.
								</p>
							</div>

							<div className="order-2 flex flex-col border-t border-line xl:order-none xl:border-l xl:border-t-0">
								<SectionLabel
									className="px-5 pt-5"
									trailing={
										<span className="text-[12px] font-semibold text-ink-2">
											{paradasVisitadas} de {stops.length}
										</span>
									}
								>
									Paradas
								</SectionLabel>

								<RouteStopList
									stops={stops}
									rotaIniciada={Boolean(route.date_start)}
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

								{podeFinalizar && (
									<div className="mt-auto flex flex-col gap-2.5 border-t border-line p-5">
										<RouteDriverActions
											variante="rodape"
											podeIniciar={false}
											podeFinalizar
											podeReportar={false}
											onIniciar={() => setModal("iniciar")}
											onFinalizar={() => setModal("finalizar")}
											onReportar={() => setModal("reportar")}
										/>
									</div>
								)}
							</div>
						</div>

						<div className="order-3 border-t border-line">
							<SectionLabel className="px-5 pt-5">
								Histórico da rota
							</SectionLabel>
							<RouteHistoryStrip route={route} />
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
