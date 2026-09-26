import type { ColunaDaLista } from "@/components/full/ListaDeDados";
import { StatusBadge } from "@/components/full/StatusBadge";
import { EnumRouteStatus, type IRouteResponse } from "@/services/types/i-route";
import { formatDateBR } from "@/utils/formatter";
import { routeToken } from "@/utils/status";
import { LimiteDaRota } from "./components/LimiteDaRota";

function regiaoDaRota(route: IRouteResponse) {
	return [route.neighborhood, route.city].filter(Boolean).join(", ") || "—";
}

function percorrido(route: IRouteResponse) {
	if (route.status !== EnumRouteStatus.Done || route.mileage == null) {
		return "—";
	}

	return `${route.mileage.toLocaleString("pt-BR")} km`;
}

export function colunasDaRota(
	mostrarMotorista: boolean,
): ColunaDaLista<IRouteResponse>[] {
	const colunas: ColunaDaLista<IRouteResponse>[] = [
		{
			chave: "rota",
			titulo: "Rota",
			largura: "minmax(0,2fr)",
			papel: "principal",
			celula: (route) => (
				<div className="flex min-w-0 flex-col items-start gap-1.5">
					<span className="max-w-full truncate text-corpo font-semibold text-ink">
						{route.name}
					</span>
					<LimiteDaRota route={route} />
				</div>
			),
		},
		{
			chave: "situacao",
			titulo: "Situação",
			largura: "minmax(0,1.1fr)",
			papel: "situacao",
			celula: (route) => (
				<StatusBadge token={routeToken(route.status)} gender="f" />
			),
		},
	];

	if (mostrarMotorista) {
		colunas.push({
			chave: "motorista",
			titulo: "Motorista",
			largura: "minmax(0,1.3fr)",
			celula: (route) => route.driver_name ?? "—",
		});
	}

	colunas.push(
		{
			chave: "programada",
			titulo: "Programada",
			largura: "minmax(0,1fr)",
			celula: (route) => formatDateBR(route.date_set),
		},
		{
			chave: "regiao",
			titulo: "Região",
			largura: "minmax(0,1.3fr)",
			ocultarNoCelular: true,
			celula: regiaoDaRota,
		},
		{
			chave: "percorrido",
			titulo: "Percorrido",
			largura: "minmax(0,0.9fr)",
			alinhar: "fim",
			celula: percorrido,
		},
	);

	return colunas;
}
