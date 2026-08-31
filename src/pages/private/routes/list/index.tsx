import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { type FormEvent, Fragment, useState } from "react";
import buscaSemResultado from "@/assets/illustrations/busca-sem-resultado.svg";
import { EmptyState } from "@/components/full/EmptyState";
import { FilterChips } from "@/components/full/FilterChips";
import { SearchBar } from "@/components/full/SearchBar";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { RouteCard } from "./components/RouteCard";
import {
	ROUTE_STATUS_FILTER_OPTIONS,
	type RouteStatusFilter,
} from "./constants";
import { useRoutesList } from "./hooks";

export function RoutesListPage() {
	const { auth } = useAuth();

	const [driverName, setDriverName] = useState("");
	const [appliedDriverName, setAppliedDriverName] = useState("");
	const [name, setName] = useState("");
	const [appliedName, setAppliedName] = useState("");
	const [city, setCity] = useState("");
	const [appliedCity, setAppliedCity] = useState("");
	const [neighborhood, setNeighborhood] = useState("");
	const [appliedNeighborhood, setAppliedNeighborhood] = useState("");
	const [dateSet, setDateSet] = useState("");
	const [status, setStatus] = useState<RouteStatusFilter>("all");
	const [page, setPage] = useState(1);

	function handleApplyFilters(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setAppliedDriverName(driverName);
		setAppliedName(name);
		setAppliedCity(city);
		setAppliedNeighborhood(neighborhood);
		setPage(1);
	}

	function handleClearFilters() {
		setDriverName("");
		setAppliedDriverName("");
		setName("");
		setAppliedName("");
		setCity("");
		setAppliedCity("");
		setNeighborhood("");
		setAppliedNeighborhood("");
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

	const { data, isLoading } = useRoutesList({
		page,
		page_size: DEFAULT_PAGE_SIZE,
		driver_name: appliedDriverName || undefined,
		name: appliedName || undefined,
		city: appliedCity || undefined,
		neighborhood: appliedNeighborhood || undefined,
		date_set: dateSet || undefined,
		status: status === "all" ? undefined : status,
	});

	const routes = data?.data ?? [];
	const total = data?.total ?? 0;
	const totalPages = Math.max(1, Math.ceil(total / DEFAULT_PAGE_SIZE));

	return (
		<Page
			title="Rotas"
			description={`${total} rotas cadastradas`}
			loading={isLoading}
			hasPermission={
				auth?.type !== EnumUserType.Common
			}
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
		>
			<div className="-mx-4 -mt-4 -mb-16 sm:-mx-6 sm:-mt-6 flex min-h-[calc(100vh-69px)] flex-col gap-[18px] bg-canvas px-4 pb-32 pt-5 lg:m-0 lg:min-h-0 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-6 lg:bg-transparent lg:px-0 lg:pb-8 lg:pt-0">
				<form onSubmit={handleApplyFilters} className="flex flex-col gap-2.5">
					<div className="grid gap-2.5 lg:grid-cols-2 xl:grid-cols-4">
						<SearchBar
							value={driverName}
							onChange={setDriverName}
							placeholder="Buscar por motorista..."
						/>
						<SearchBar
							value={name}
							onChange={setName}
							placeholder="Buscar por nome da rota..."
						/>
						<SearchBar
							value={city}
							onChange={setCity}
							placeholder="Buscar por cidade..."
						/>
						<SearchBar
							value={neighborhood}
							onChange={setNeighborhood}
							placeholder="Buscar por bairro..."
						/>
					</div>

					<div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
						<input
							type="date"
							value={dateSet}
							onChange={(event) => handleDateSetChange(event.target.value)}
							aria-label="Filtrar por data programada"
							className="h-[43px] w-full rounded-card-sm border border-line bg-surface px-4 text-[15px] text-ink outline-none placeholder:text-ink-3 lg:w-auto lg:flex-1"
						/>
						<div className="grid grid-cols-2 gap-2.5 lg:flex lg:shrink-0 lg:gap-2.5">
							<button
								type="submit"
								className="flex h-[43px] shrink-0 items-center justify-center gap-2 rounded-full bg-blue-deep-fill hover:bg-blue-fill px-5 text-[14px] font-semibold text-white transition-transform active:scale-[0.98]"
							>
								<Search className="size-4" />
								Aplicar filtro
							</button>
							<button
								type="button"
								onClick={handleClearFilters}
								className="flex h-[43px] shrink-0 items-center justify-center gap-2 rounded-card-sm border border-line bg-surface px-5 text-[14px] font-semibold text-ink-2 transition-transform active:scale-[0.98]"
							>
								<X className="size-4" />
								Limpar filtro
							</button>
						</div>
					</div>
				</form>

				<div className="sem-barra flex items-center gap-2.5 overflow-x-auto">
					<FilterChips
						options={ROUTE_STATUS_FILTER_OPTIONS}
						value={status}
						onChange={handleStatusChange}
					/>
				</div>

				{routes.length === 0 ? (
					<div className="rounded-card-sm bg-surface">
						<EmptyState
							illustration={buscaSemResultado}
							title="Nenhuma rota encontrada"
							description="Ajuste a busca ou o filtro selecionado."
						/>
					</div>
				) : (
					<>
						<div className="overflow-hidden rounded-2xl border border-line bg-canvas">
							{routes.map((route, index) => (
								<Fragment key={route.id_route}>
									{index > 0 && <div className="h-2 bg-canvas" />}
									<RouteCard route={route} />
								</Fragment>
							))}
						</div>

						{totalPages > 1 && (
							<div className="flex items-center justify-center gap-3 lg:justify-end">
								<button
									type="button"
									onClick={() => setPage((current) => Math.max(1, current - 1))}
									disabled={page === 1}
									aria-label="Página anterior"
									className="flex size-9 items-center justify-center rounded-lg border border-line bg-surface text-ink-2 transition-colors hover:bg-surface-3 disabled:opacity-40"
								>
									<ChevronLeft className="size-4" />
								</button>
								<span className="text-[13px] font-semibold text-ink">
									Página {page} de {totalPages}
								</span>
								<button
									type="button"
									onClick={() =>
										setPage((current) => Math.min(totalPages, current + 1))
									}
									disabled={page === totalPages}
									aria-label="Próxima página"
									className="flex size-9 items-center justify-center rounded-lg border border-line bg-surface text-ink-2 transition-colors hover:bg-surface-3 disabled:opacity-40"
								>
									<ChevronRight className="size-4" />
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</Page>
	);
}
