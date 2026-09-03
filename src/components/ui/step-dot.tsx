import { AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepDotStatus = "done" | "current" | "waiting" | "failed";

type StepDotProps = {
	status: StepDotStatus;
	order: number;
	celebrate?: boolean;
	/** Classe do circulo: tamanho, tipografia. */
	className?: string;
	/**
	 * Classe do envoltorio, que e quem ocupa espaco no layout e ancora as ondas
	 * e o arco em rotacao. Margem, visibilidade e posicionamento vao aqui - no
	 * `className` elas escondem o circulo e deixam a animacao orfa.
	 */
	wrapperClassName?: string;
	iconClassName?: string;
};

export function StepDot({
	status,
	order,
	celebrate = false,
	className,
	wrapperClassName,
	iconClassName,
}: StepDotProps) {
	const isCurrent = status === "current";
	const isDone = status === "done";
	const isFailed = status === "failed";

	return (
		<span
			className={cn(
				"relative flex shrink-0 items-center justify-center",
				wrapperClassName,
			)}
		>
			{isCurrent && !celebrate && (
				<>
					<span
						aria-hidden="true"
						className="absolute inset-0 -m-[3px] rounded-full bg-blue-bright/10"
					/>
					<span
						aria-hidden="true"
						className="absolute inset-0 -m-[3px] rounded-full border-2 border-transparent border-t-blue-bright border-r-blue-bright/35 motion-safe:giro-etapa"
					/>
				</>
			)}

			{celebrate && (
				<>
					<span
						aria-hidden="true"
						className="absolute inset-0 rounded-full bg-blue-bright/40 motion-safe:ondulacao-etapa"
					/>
					<span
						aria-hidden="true"
						style={{ animationDelay: "280ms" }}
						className="absolute inset-0 rounded-full bg-mint/45 motion-safe:ondulacao-etapa"
					/>
				</>
			)}

			<span
				className={cn(
					"relative flex shrink-0 items-center justify-center rounded-full font-sans font-bold tabular-nums transition-all duration-300",
					isCurrent &&
						"bg-surface text-blue-bright ring-2 ring-blue-bright/45 ring-inset",
					isDone && "bg-blue-bright-fill text-white shadow-soft",
					isFailed && "bg-danger-fill text-white shadow-soft",
					!isCurrent &&
						!isDone &&
						!isFailed &&
						"border-[1.5px] border-dashed border-blue-tint-2 bg-surface text-ink-3",
					celebrate && "motion-safe:pop-etapa",
					className,
				)}
			>
				{isDone && celebrate ? (
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={3}
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
						className={cn("size-3.5", iconClassName)}
					>
						<title>Etapa concluída</title>
						<path d="M20 6 9 17l-5-5" className="motion-safe:traco-etapa" />
					</svg>
				) : isDone ? (
					<Check className={cn("size-3.5", iconClassName)} strokeWidth={3} />
				) : isFailed ? (
					<AlertTriangle className={cn("size-3.5", iconClassName)} />
				) : (
					order
				)}
			</span>
		</span>
	);
}
