import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronRight, Gauge, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RouteStatusBadge } from "@/components/full/RouteStatusBadge";
import { EnumRouteStatus, type IRouteResponse } from "@/services/types/i-route";
import { formatDateBR } from "@/utils/formatter";
import { RouteMiniMap } from "./RouteMiniMap";

type RouteCardProps = {
	route: IRouteResponse;
};

export function RouteCard({ route }: RouteCardProps) {
	const navigate = useNavigate();
	const reduzirMovimento = useReducedMotion();

	const regiao = [route.city, route.neighborhood].filter(Boolean).join(" · ");
	const mostrarKm =
		route.status === EnumRouteStatus.Done && route.mileage != null;

	const dados = [
		{
			chave: "motorista",
			icone: <User className="size-4 shrink-0 text-ink-2" />,
			rotulo: "Motorista",
			valor: route.driver_name ?? "—",
		},
		{
			chave: "data",
			icone: <Calendar className="size-4 shrink-0 text-ink-2" />,
			rotulo: "Programada",
			valor: formatDateBR(route.date_set),
		},
		mostrarKm
			? {
					chave: "km",
					icone: <Gauge className="size-4 shrink-0 text-ink-2" />,
					rotulo: "Percorrido",
					valor: `${route.mileage} km`,
				}
			: {
					chave: "regiao",
					icone: <MapPin className="size-4 shrink-0 text-ink-2" />,
					rotulo: "Região",
					valor: regiao || "—",
				},
	];

	return (
		<motion.button
			type="button"
			onClick={() => navigate(`/rotas/${route.id_route}`)}
			whileHover={reduzirMovimento ? undefined : { y: -3 }}
			whileTap={reduzirMovimento ? undefined : { scale: 0.99 }}
			transition={{ type: "spring", stiffness: 320, damping: 28 }}
			className="group flex h-full w-full overflow-hidden rounded-card-sm border border-line bg-surface text-left shadow-soft transition-[box-shadow,border-color] duration-300 hover:border-blue-tint-2 hover:shadow-lift"
		>
			<div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
				<div className="flex items-start justify-between gap-3">
					<p className="min-w-0 flex-1 break-words text-[16px] font-bold text-ink">
						{route.name}
					</p>
					<div className="flex shrink-0 items-center gap-2">
						<RouteStatusBadge status={route.status} />
						<ChevronRight className="size-5 shrink-0 text-ink-2 transition-transform duration-300 group-hover:translate-x-0.5" />
					</div>
				</div>

				<dl className="mt-auto grid grid-cols-3 gap-3">
					{dados.map((item) => (
						<div key={item.chave} className="flex min-w-0 flex-col gap-1">
							<dt className="flex items-center gap-1.5 text-[11px] text-ink-2">
								{item.icone}
								{item.rotulo}
							</dt>
							<dd className="truncate text-[13px] font-semibold text-ink">
								{item.valor}
							</dd>
						</div>
					))}
				</dl>
			</div>

			<div
				aria-hidden="true"
				className="relative isolate hidden w-[180px] shrink-0 self-stretch overflow-hidden border-l border-line sm:block"
			>
				<RouteMiniMap city={route.city} neighborhood={route.neighborhood} />
			</div>
		</motion.button>
	);
}
