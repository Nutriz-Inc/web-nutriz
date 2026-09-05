import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionLabel } from "@/components/full/SectionLabel";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { EnumRouteStatus, type IRouteStop } from "@/services/types/i-route";
import { EnumUserType } from "@/services/types/i-user";
import { AddStopSheet, type EtapaFiltro } from "./components/AddStopSheet";
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
import { RouteDetailsCard } from "./components/RouteDetailsCard";
import { RouteDriverCard } from "./components/RouteDriverCard";
import { RouteHeaderActions } from "./components/RouteHeaderActions";
import { RouteHistoryStrip } from "./components/RouteHistoryStrip";
import { RouteIdentityCard } from "./components/RouteIdentityCard";
import { RouteMapCard } from "./components/RouteMapCard";
import { RouteStartBanner } from "./components/RouteStartBanner";
import { RouteStopList } from "./components/RouteStopList";
import { RouteStopsFooter } from "./components/RouteStopsFooter";
import { RouteTimeCard } from "./components/RouteTimeCard";
import { StopIssueSheet } from "./components/StopIssueSheet";
import { CLASSE_ALTURA_PAINEL } from "./constants";
import {
	useCreateRouteStop,
	useDonationStepOptions,
	useMarkStopArrival,
	useMarkStopError,
	useRemoveRouteStop,
	useRouteDetail,
	useRouteDriver,
	useRouteStats,
	useUpdateRoute,
} from "./hooks";
import {
	acrescentarRelato,
	combinaComBusca,
	ehIdDeDoacao,
	ehRotaAlteravel,
	entradaDeImprevisto,
	estadoDaRota,
	formatarEndereco,
	mensagemDeErro,
	ordenarParadas,
	paradasPendentes,
} from "./utils";

const CARTAO = "overflow-hidden rounded-card border border-line bg-surface";

const BLOCO = "flex flex-col gap-2.5";

type Modal =
	| "editar"
	| "cancelar"
	| "adicionar"
	| "remover"
	| "chegar"
	| "problema"
	| "finalizar"
	| "reportar";

export function RouteDetailPage() {
	const { id_route = "" } = useParams();
	const navigate = useNavigate();
	const { auth } = useAuth();

	const [modal, setModal] = useState<Modal>();
	const [paradaSelecionada, setParadaSelecionada] = useState<IRouteStop>();
	const [erroDeAcao, setErroDeAcao] = useState<string>();
	const [etapaFiltro, setEtapaFiltro] = useState<EtapaFiltro>("all");
	const [buscaEtapa, setBuscaEtapa] = useState("");
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
	const rotaAlteravel = route ? ehRotaAlteravel(route.status) : false;

	const podeGerenciar = Boolean(ehAdm && rotaAlteravel);
	const podeOperar = Boolean(ehDonoDaRota && rotaAlteravel);

	const podeIniciar = podeOperar && !route?.date_start;
	const podeMarcarParada = podeOperar && Boolean(route?.date_start);
	const pendentes = paradasPendentes(stops);
	const podeFinalizar =
		podeOperar &&
		Boolean(route?.date_start) &&
		stops.length > 0 &&
		pendentes === 0;
	const mostrarCheckIn =
		estadoCheckIn !== "oculto" &&
		(podeIniciar || estadoCheckIn !== "pronto") &&
		Boolean(ehDonoDaRota);
	const podeReportar =
		podeOperar &&
		(route?.status === EnumRouteStatus.Pending ||
			route?.status === EnumRouteStatus.InProgress);

	const ordem = !podeOperar
		? undefined
		: podeIniciar
			? {
					trajeto: "order-1",
					tempo: "order-2",
					paradas: "order-3",
					identidade: "order-4",
					motorista: "order-5",
					descricao: "order-6",
					historico: "order-7",
				}
			: {
					tempo: "order-1",
					paradas: "order-2",
					trajeto: "order-3",
					identidade: "order-4",
					motorista: "order-5",
					descricao: "order-6",
					historico: "order-7",
				};

	const updateMutation = useUpdateRoute(id_route);
	const createStopMutation = useCreateRouteStop(id_route);
	const removeStopMutation = useRemoveRouteStop(id_route);
	const markArrivalMutation = useMarkStopArrival(id_route);
	const markErrorMutation = useMarkStopError(id_route);

	const opcoesQuery = useDonationStepOptions({
		enabled: modal === "adicionar" && podeGerenciar,
		city: route?.city,
		neighborhood: route?.neighborhood,
		name: etapaFiltro === "all" ? undefined : etapaFiltro,
		id_donation: ehIdDeDoacao(buscaEtapa) ? buscaEtapa.trim() : undefined,
	});

	const idsJaNaRota = new Set(stops.map((stop) => stop.id_donation_step));
	const opcoesDisponiveis = (opcoesQuery.data?.data ?? []).filter(
		(step) =>
			!idsJaNaRota.has(step.id_donation_step) &&
			(ehIdDeDoacao(buscaEtapa) ||
				combinaComBusca(
					step,
					[step.address?.street, step.address?.neighborhood, step.address?.city]
						.filter(Boolean)
						.join(" "),
					buscaEtapa,
				)),
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
			actionSlot={
				route ? (
					<RouteHeaderActions
						podeCancelar={podeGerenciar}
						podeReportar={podeReportar}
						onCancelar={() => setModal("cancelar")}
						onReportar={() => setModal("reportar")}
					/>
				) : undefined
			}
			hasPermission={auth?.type !== EnumUserType.Common}
			loading={routeQuery.isLoading}
			backTo="/rotas"
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px] lg:mb-5"
		>
			{route && (
				<div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5 lg:gap-6">
					{podeOperar && !route.date_start && (
						<RouteStartBanner dateSet={route.date_set} />
					)}

					<div className="flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:gap-6">
						<div
							style={{ animationDelay: "20ms" }}
							className={cn(
								CARTAO,
								"motion-safe:surge-etapa lg:col-span-12 lg:order-none",
								ordem?.identidade,
							)}
						>
							<RouteIdentityCard route={route} />
						</div>

						<section
							style={{ animationDelay: "40ms" }}
							className={cn(
								BLOCO,
								"motion-safe:surge-etapa lg:col-span-8 lg:order-none",
								ordem?.motorista,
							)}
						>
							<SectionLabel>Motorista</SectionLabel>
							<div className={cn(CARTAO, "flex-1")}>
								<RouteDriverCard
									driverName={route.driver_name}
									driver={driverQuery.data}
									carregando={driverQuery.isLoading}
									relato={route.user_feedback}
									onAbrirPerfil={
										ehAdm
											? () =>
													navigate(`/usuarios/${route.id_driver}`, {
														state: { backTo: `/rotas/${id_route}` },
													})
											: undefined
									}
								/>
							</div>
						</section>

						<section
							style={{ animationDelay: "60ms" }}
							className={cn(
								BLOCO,
								"motion-safe:surge-etapa lg:col-span-4 lg:order-none",
								ordem?.tempo,
							)}
						>
							<SectionLabel>Tempo de rota</SectionLabel>
							<div className={cn(CARTAO, "flex-1")}>
								<RouteTimeCard
									dateStart={route.date_start}
									dateEnd={route.date_end}
									mileage={route.mileage}
									mediaPorRota={
										ehAdm
											? (statsQuery.data?.average_mileage_per_route ?? null)
											: null
									}
								/>
							</div>
						</section>

						<section
							style={{ animationDelay: "120ms" }}
							className={cn(
								BLOCO,
								"motion-safe:surge-etapa lg:col-span-4 lg:order-none",
								ordem?.paradas,
							)}
						>
							<SectionLabel
								trailing={
									<span className="text-[12px] font-semibold text-ink-2">
										{paradasVisitadas} de {stops.length}
									</span>
								}
							>
								Paradas
							</SectionLabel>

							<div
								className={cn(CARTAO, "flex flex-col", CLASSE_ALTURA_PAINEL)}
							>
								<RouteStopList
									stops={stops}
									rotaIniciada={Boolean(route.date_start)}
									estadoRota={estadoDaRota(route)}
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
									onReportarProblema={(stop) => {
										setParadaSelecionada(stop);
										setModal("problema");
									}}
								/>

								{podeOperar && (
									<RouteStopsFooter
										pendentes={pendentes}
										podeFinalizar={podeFinalizar}
										onFinalizar={() => setModal("finalizar")}
									/>
								)}
							</div>
						</section>

						<section
							style={{ animationDelay: "140ms" }}
							className={cn(
								BLOCO,
								"motion-safe:surge-etapa lg:col-span-8 lg:order-none",
								ordem?.trajeto,
							)}
						>
							<SectionLabel
								trailing={
									<OpenInMapsButton
										stops={stops}
										compacto
										className="lg:hidden"
									/>
								}
							>
								Trajeto
							</SectionLabel>

							<div className={CARTAO}>
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
							</div>

							<div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
								<p className="text-[12px] leading-relaxed text-ink-2">
									Traçado ilustrativo. Início, chegadas e finalização continuam
									sendo registrados aqui no sistema.
								</p>

								<OpenInMapsButton stops={stops} className="hidden lg:flex" />
							</div>
						</section>

						<section
							style={{ animationDelay: "200ms" }}
							className={cn(
								BLOCO,
								"motion-safe:surge-etapa lg:col-span-6 lg:order-none",
								ordem?.descricao,
							)}
						>
							<SectionLabel>Descrição</SectionLabel>
							<div className={cn(CARTAO, "flex-1")}>
								<RouteDetailsCard
									route={route}
									podeEditar={podeGerenciar}
									onEditar={() => setModal("editar")}
								/>
							</div>
						</section>

						<section
							style={{ animationDelay: "220ms" }}
							className={cn(
								BLOCO,
								"motion-safe:surge-etapa lg:col-span-6 lg:order-none",
								ordem?.historico,
							)}
						>
							<SectionLabel>Histórico</SectionLabel>
							<div className={cn(CARTAO, "flex-1")}>
								<RouteHistoryStrip route={route} />
							</div>
						</section>
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
						etapa={etapaFiltro}
						onEtapaChange={setEtapaFiltro}
						busca={buscaEtapa}
						onBuscaChange={setBuscaEtapa}
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

					<StopIssueSheet
						open={modal === "problema"}
						onOpenChange={(aberto) => (aberto ? undefined : fecharModal())}
						endereco={
							paradaSelecionada ? formatarEndereco(paradaSelecionada) : ""
						}
						salvando={markErrorMutation.isPending}
						erro={erroDeAcao}
						onConfirmar={(texto) => {
							if (!paradaSelecionada) return;

							const numero =
								stops.findIndex(
									(stop) =>
										stop.id_route_donation_step ===
										paradaSelecionada.id_route_donation_step,
								) + 1;

							executar(() =>
								markErrorMutation.mutateAsync({
									id_stop: paradaSelecionada.id_route_donation_step,
									relato: acrescentarRelato(
										route.user_feedback,
										entradaDeImprevisto(numero, paradaSelecionada, texto),
									),
								}),
							);
						}}
					/>

					<FinishRouteSheet
						open={modal === "finalizar"}
						onOpenChange={(aberto) => (aberto ? undefined : fecharModal())}
						duracaoMs={
							route.date_start
								? Date.now() - new Date(route.date_start).getTime()
								: 0
						}
						relatoAtual={route.user_feedback}
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
