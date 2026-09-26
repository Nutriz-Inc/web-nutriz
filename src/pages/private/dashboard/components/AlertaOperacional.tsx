import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type AlertaOperacionalProps = {
	quantidade: number;
	rotulo: string;
	destino: string;
	grave?: boolean;
};

export function AlertaOperacional({
	quantidade,
	rotulo,
	destino,
	grave = false,
}: AlertaOperacionalProps) {
	return (
		<Link
			to={destino}
			className="group flex items-center gap-3 rounded-card-sm px-3 py-2.5 transition-colors duration-150 hover:bg-surface-2"
		>
			<span
				className={cn(
					"grid h-7 min-w-7 place-items-center rounded-full px-2 text-[13px] font-bold tabular-nums",
					grave ? "bg-danger-tint text-danger" : "bg-orange-tint text-orange",
				)}
			>
				{quantidade}
			</span>
			<span className="flex-1 text-[13px] text-ink">{rotulo}</span>
			<ChevronRight
				className="size-4 text-ink-3 transition-transform duration-150 group-hover:translate-x-0.5"
				aria-hidden="true"
			/>
		</Link>
	);
}
