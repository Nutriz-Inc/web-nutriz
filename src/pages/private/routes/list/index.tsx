import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import buscaSemResultado from "@/assets/illustrations/busca-sem-resultado.svg";
import {
	BuscaPorCampo,
	type CampoDeBusca,
} from "@/components/full/BuscaPorCampo";
import { EmptyState } from "@/components/full/EmptyState";
import { FilterChips } from "@/components/full/FilterChips";
import { GrupoDeFiltro } from "@/components/full/GrupoDeFiltro";
import { ListaDeDados } from "@/components/full/ListaDeDados";
import { Paginacao } from "@/components/full/Paginacao";
import { PainelDeFiltros } from "@/components/full/PainelDeFiltros";
import { RefreshableList } from "@/components/full/RefreshableList";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { EnumRouteStatus } from "@/services/types/i-route";
import { EnumUserType } from "@/services/types/i-user";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { colunasDaRota } from "./colunas";
import { CreateRouteSheet } from "./components/CreateRouteSheet";
import {
	ROUTE_STATUS_FILTER_OPTIONS,
	ROUTE_STATUS_FILTER_OPTIONS_OPERACAO,
	type RouteStatusFilter,
} from "./constants";
import { useRoutesList } from "./hooks";
import { ordenarPorPrioridade } from "./utils";

type CampoDaRota = "name" | "driver_name" | "city" | "neighborhood";

const CAMPOS_DA_ROTA: CampoDeBusca<CampoDaRota>[] = [
	{ chave: "name", rotulo: "Rota", placeholder: "Buscar pelo nome da rota" },
	{
		chave: "driver_name",
		rotulo: "Motorista",
		placeholder: "Buscar pelo nome do motorista",
	},
	{ chave: "city", rotulo: "Cidade", placeholder: "Buscar pela cidade" },
	{
		chave: "neighborhood",
		rotulo: "Bairro",
		placeholder: "Buscar pelo bairro",
	},
];

export function RoutesListPage() {
	const { auth } = useAuth();
	const navigate = useNavigate();

	const ehAdm = auth?.type === EnumUserType.Admin;
	const ehMotorista = auth?.type === EnumUserType.Driver;

	const campos = ehAdm ? CAMPOS_DA_ROTA : CAMPOS_DA_ROTA.slice(0, 1);

	const [campo, setCampo] = useState<CampoDaRota>("name");
	const [termo, setTermo] = useState("");
	const [dateSet, setDateSet] = useState("");
	const [status, setStatus] = useState<RouteStatusFilter>("all");
	const [page, setPage] = useState(1);

	const termoAplicado = useDebouncedValue(termo.trim(), 400);

	const temFiltro = !!(termoAplicado || dateSet || status !== "all");

	function handleTermoChange(valor: string) {
		setTermo(valor);
		setPage(1);
	}

	function handleCampoChange(proximo: CampoDaRota) {
		setCampo(proximo);
		setPage(1);
	}

	function handleClearFilters() {
		setTermo("");
		setDateSet("");
		setStatus("all");
		setPage(1);
	}

	function handleStatusChange(value: RouteStatusFilter) {
		setStatus(value);
		setPage(1);
	}

	function handleDateSetChange(value: string) {
		setDateSet(value);
		setPage(1);
	}

	const busca = (chave: CampoDaRota) =>
		campo === chave ? termoAplicado || undefined : undefined;

	const filtrarErroLocalmente = status === EnumRouteStatus.Error;
	const statusParaApi =
		status === "all" || filtrarErroLocalmente ? undefined : status;

	const { data, isLoading, isPlaceholderData, isError, error, refetch } =
		useRoutesList({
			page,
			page_size: DEFAULT_PAGE_SIZE,
			id_driver: ehMotorista ? auth?.id_user : undefined,
			driver_name: ehAdm ? busca("driver_name") : undefined,
			name: busca("name"),
			city: ehAdm ? busca("city") : undefined,
			neighborhood: ehAdm ? busca("neighborhood") : undefined,
			date_set: dateSet || undefined,
			status: statusParaApi,
		});

	const todasAsRotas = data?.data ?? [];
	const routes = ordenarPorPrioridade(
		filtrarErroLocalmente
			? todasAsRotas.filter((route) => route.status === EnumRouteStatus.Error)
			: todasAsRotas,
	);
	const total = filtrarErroLocalmente ? routes.length : (data?.total ?? 0);
	const totalPages = Math.max(
		1,
		Math.ceil((data?.total ?? 0) / DEFAULT_PAGE_SIZE),
	);

	return (
		<Page
			title="Rotas"
			description={`${total} ${total === 1 ? "rota" : "rotas"}${temFiltro ? " no filtro" : " cadastradas"}`}
			loading={isLoading}
			error={isError ? error : undefined}
			onRetry={() => refetch()}
			hasPermission={auth?.type !== EnumUserType.Common}
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={ehAdm && <CreateRouteSheet />}
		>
			<div className="flex flex-col gap-4 pb-24 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-5 lg:pb-8">
				<BuscaPorCampo
					campos={campos}
					campo={campo}
					aoTrocarCampo={handleCampoChange}
					valor={termo}
					aoMudar={handleTermoChange}
				/>

				<PainelDeFiltros>
					<GrupoDeFiltro rotulo="Situação da rota">
						<FilterChips
							options={
								ehAdm
									? ROUTE_STATUS_FILTER_OPTIONS
									: ROUTE_STATUS_FILTER_OPTIONS_OPERACAO
							}
							value={status}
							onChange={handleStatusChange}
						/>
					</GrupoDeFiltro>
					<GrupoDeFiltro rotulo="Data programada">
						<input
							type="date"
							value={dateSet}
							onChange={(event) => handleDateSetChange(event.target.value)}
							aria-label="Filtrar por data programada"
							className="h-10 w-full rounded-full border border-line bg-surface px-4 text-apoio text-ink outline-none transition-colors focus:border-blue-bright sm:w-[190px]"
						/>
					</GrupoDeFiltro>
					{temFiltro && (
						<Button
							variant="ghost"
							size="pill"
							type="button"
							onClick={handleClearFilters}
							className="self-start text-ink-2 lg:ml-auto lg:self-end"
						>
							<X className="size-4" />
							Limpar filtros
						</Button>
					)}
				</PainelDeFiltros>

				<RefreshableList updating={isPlaceholderData}>
					<ListaDeDados
						itens={routes}
						colunas={colunasDaRota(!ehMotorista)}
						chaveDoItem={(route) => route.id_route}
						rotuloDoItem={(route) => `Abrir a rota ${route.name}`}
						aoAbrir={(route) => navigate(`/rotas/${route.id_route}`)}
						vazio={
							<EmptyState
								illustration={buscaSemResultado}
								title={
									temFiltro
										? "Nenhuma rota encontrada"
										: ehMotorista
											? "Nenhuma rota atribuída a você"
											: "Nenhuma rota criada ainda"
								}
								description={
									temFiltro
										? "Ajuste a busca ou o filtro selecionado."
										: ehMotorista
											? "Quando o time montar uma rota para você, ela aparece aqui. Aproveite o descanso."
											: "Crie a primeira rota para começar a organizar as coletas."
								}
							/>
						}
					/>
				</RefreshableList>

				<Paginacao
					pagina={page}
					totalDePaginas={totalPages}
					aoMudar={setPage}
				/>
			</div>
		</Page>
	);
}
