import { X } from "lucide-react";
import { type CSSProperties, useState } from "react";
import buscaSemResultado from "@/assets/illustrations/busca-sem-resultado.svg";
import {
	BuscaPorCampo,
	type CampoDeBusca,
} from "@/components/full/BuscaPorCampo";
import { EmptyState } from "@/components/full/EmptyState";
import { FilterChips } from "@/components/full/FilterChips";
import { GrupoDeFiltro } from "@/components/full/GrupoDeFiltro";
import { ListaDeDadosEsqueleto } from "@/components/full/ListaDeDadosEsqueleto";
import { Paginacao } from "@/components/full/Paginacao";
import { PainelDeFiltros } from "@/components/full/PainelDeFiltros";
import { RefreshableList } from "@/components/full/RefreshableList";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { EnumUserType } from "@/services/types/i-user";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { formatCpf } from "@/utils/formatter";
import { DonationManagementCard } from "./components/DonationManagementCard";
import {
	ACTIVE_FILTER_OPTIONS,
	type ActiveFilter,
	RECURRENT_FILTER_OPTIONS,
	type RecurrentFilter,
	STEP_FILTER_OPTIONS,
	type StepFilter,
} from "./constants";
import { useAdminDonationsList } from "./hooks";

type CampoDaDoacao = "nome" | "cpf";

const CAMPOS_DA_DOACAO: CampoDeBusca<CampoDaDoacao>[] = [
	{ chave: "nome", rotulo: "Nome", placeholder: "Buscar pelo nome da doadora" },
	{ chave: "cpf", rotulo: "CPF", placeholder: "Buscar pelo CPF da doadora" },
];

export function DonationsManagementPage() {
	const { auth } = useAuth();

	const [campo, setCampo] = useState<CampoDaDoacao>("nome");
	const [termo, setTermo] = useState("");
	const [filter, setFilter] = useState<StepFilter>("all");
	const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
	const [recurrentFilter, setRecurrentFilter] =
		useState<RecurrentFilter>("all");
	const [page, setPage] = useState(1);

	const termoAplicado = useDebouncedValue(termo.trim(), 400);

	const temFiltro = !!(
		termoAplicado ||
		filter !== "all" ||
		activeFilter !== "all" ||
		recurrentFilter !== "all"
	);

	function handleTermoChange(valor: string) {
		setTermo(campo === "cpf" ? formatCpf(valor) : valor);
		setPage(1);
	}

	function handleCampoChange(proximo: CampoDaDoacao) {
		setCampo(proximo);
		setTermo("");
		setPage(1);
	}

	function handleClearFilters() {
		setTermo("");
		setFilter("all");
		setActiveFilter("all");
		setRecurrentFilter("all");
		setPage(1);
	}

	function handleFilterChange(value: StepFilter) {
		setFilter(value);
		setPage(1);
	}

	function handleActiveFilterChange(value: ActiveFilter) {
		setActiveFilter(value);
		setPage(1);
	}

	function handleRecurrentFilterChange(value: RecurrentFilter) {
		setRecurrentFilter(value);
		setPage(1);
	}

	const { data, isLoading, isPlaceholderData, isError, error, refetch } =
		useAdminDonationsList({
			page,
			page_size: DEFAULT_PAGE_SIZE,
			user_name: campo === "nome" ? termoAplicado || undefined : undefined,
			user_document:
				campo === "cpf"
					? termoAplicado.replace(/\D/g, "") || undefined
					: undefined,
			current_step: filter === "all" ? undefined : filter,
			is_active: activeFilter === "all" ? undefined : activeFilter === "active",
			is_recurrent:
				recurrentFilter === "all" ? undefined : recurrentFilter === "recurrent",
		});

	const donations = data?.data ?? [];
	const total = data?.total ?? 0;
	const totalPages = Math.max(1, Math.ceil(total / DEFAULT_PAGE_SIZE));

	return (
		<Page
			title="Doações"
			description={`${total} ${total === 1 ? "doação" : "doações"}${temFiltro ? " no filtro" : " cadastradas"}`}
			loading={isLoading}
			skeleton={<ListaDeDadosEsqueleto rotulo="Carregando as doações" />}
			error={isError ? error : undefined}
			onRetry={() => refetch()}
			hasPermission={auth?.type === EnumUserType.Admin}
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
		>
			<div className="flex flex-col gap-4 pb-24 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-5 lg:pb-8">
				<BuscaPorCampo
					campos={CAMPOS_DA_DOACAO}
					campo={campo}
					aoTrocarCampo={handleCampoChange}
					valor={termo}
					aoMudar={handleTermoChange}
				/>

				<PainelDeFiltros>
					<GrupoDeFiltro rotulo="Situação">
						<FilterChips
							options={ACTIVE_FILTER_OPTIONS}
							value={activeFilter}
							onChange={handleActiveFilterChange}
						/>
					</GrupoDeFiltro>
					<GrupoDeFiltro rotulo="Recorrência">
						<FilterChips
							options={RECURRENT_FILTER_OPTIONS}
							value={recurrentFilter}
							onChange={handleRecurrentFilterChange}
						/>
					</GrupoDeFiltro>
					<GrupoDeFiltro rotulo="Etapa atual">
						<FilterChips
							options={STEP_FILTER_OPTIONS}
							value={filter}
							onChange={handleFilterChange}
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
					{donations.length === 0 ? (
						<div className="rounded-card-sm border border-line bg-surface">
							<EmptyState
								illustration={buscaSemResultado}
								title={
									termoAplicado
										? `Nenhum resultado para "${termoAplicado}"`
										: "Nenhuma doação encontrada"
								}
								description={
									termoAplicado
										? "Confira a grafia ou troque o campo da busca."
										: "Ajuste os filtros selecionados."
								}
							/>
						</div>
					) : (
						<ul className="flex flex-col gap-2.5">
							{donations.map((donation, indice) => (
								<li
									key={donation.id_donation}
									className="entra"
									style={{ "--i": indice } as CSSProperties}
								>
									<DonationManagementCard donation={donation} />
								</li>
							))}
						</ul>
					)}
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
