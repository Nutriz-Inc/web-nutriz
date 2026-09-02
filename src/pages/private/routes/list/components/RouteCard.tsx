import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronRight, Gauge, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppointmentInfoRow } from "@/components/full/AppointmentInfoRow";
import { RouteStatusBadge } from "@/components/full/RouteStatusBadge";
import { EnumRouteStatus, type IRouteResponse } from "@/services/types/i-route";
import { formatDateBR } from "@/utils/formatter";

type RouteCardProps = {
	route: IRouteResponse;
};

export function RouteCard({ route }: RouteCardProps) {
	const navigate = useNavigate();
	const reduzirMovimento = useReducedMotion();

	const location = [route.city, route.neighborhood].filter(Boolean).join(" · ");
	const showMileage =
		route.status === EnumRouteStatus.Done && route.mileage != null;

	return (
		<motion.button
			type="button"
			onClick={() => navigate(`/rotas/${route.id_route}`)}
			whileHover={reduzirMovimento ? undefined : { y: -3 }}
			whileTap={reduzirMovimento ? undefined : { scale: 0.99 }}
			transition={{ type: "spring", stiffness: 320, damping: 28 }}
			className="group flex h-full w-full flex-col gap-4 rounded-card-sm border border-line bg-surface p-5 text-left shadow-soft transition-[box-shadow,border-color] duration-300 hover:border-blue-tint-2 hover:shadow-lift"
		>
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex min-w-0 flex-col">
						<p className="truncate text-[16px] font-bold text-ink">
							{route.name}
						</p>
					</div>
				</div>
				<div className="flex shrink-0 items-center gap-2">
					<RouteStatusBadge status={route.status} />
					<ChevronRight className="size-5 shrink-0 text-ink-3 transition-transform duration-300 group-hover:translate-x-0.5" />
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<AppointmentInfoRow
					icon={<User className="size-[18px] shrink-0 text-ink-2" />}
					label="Motorista"
					value={route.driver_name ?? "—"}
				/>
				<AppointmentInfoRow
					icon={<Calendar className="size-[18px] shrink-0 text-ink-2" />}
					label="Data programada"
					value={formatDateBR(route.date_set)}
				/>
				{location && (
					<AppointmentInfoRow
						icon={<MapPin className="size-[18px] shrink-0 text-ink-2" />}
						label="Local"
						value={location}
					/>
				)}
				{showMileage && (
					<AppointmentInfoRow
						icon={<Gauge className="size-[18px] shrink-0 text-ink-2" />}
						label="Quilometragem"
						value={`${route.mileage} km`}
					/>
				)}
			</div>
		</motion.button>
	);
}
