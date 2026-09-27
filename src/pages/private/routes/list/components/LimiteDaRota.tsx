import { TimerReset } from "lucide-react";
import { cn } from "@/lib/utils";
import { EnumRouteStatus, type IRouteResponse } from "@/services/types/i-route";
import { situacaoLimiteRota } from "@/utils/route-time";

type LimiteDaRotaProps = {
	route: IRouteResponse;
};

export function LimiteDaRota({ route }: LimiteDaRotaProps) {
	if (route.status !== EnumRouteStatus.InProgress) return null;

	const limite = situacaoLimiteRota(route.date_start, route.date_end);
	if (!limite) return null;

	return (
		<span
			className={cn(
				"inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-rotulo font-semibold tabular-nums",
				limite.excedeu
					? "bg-danger-tint text-danger"
					: limite.emAviso
						? "bg-orange-tint text-orange"
						: "bg-blue-tint text-blue-deep",
			)}
		>
			<TimerReset className="size-3.5 shrink-0" aria-hidden="true" />
			{limite.rotulo}
		</span>
	);
}
