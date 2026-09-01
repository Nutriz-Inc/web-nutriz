import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepDotStatus = "done" | "current" | "waiting";

type StepDotProps = {
	status: StepDotStatus;
	order: number;
	className?: string;
	iconClassName?: string;
};

export function StepDot({
	status,
	order,
	className,
	iconClassName,
}: StepDotProps) {
	const isCurrent = status === "current";
	const isDone = status === "done";

	return (
		<span className="relative flex shrink-0 items-center justify-center">
			{isCurrent && (
				<>
					<span
						aria-hidden="true"
						className="absolute inset-0 -m-1 rounded-full bg-blue-bright/30 motion-safe:pulso-etapa"
					/>
					<span
						aria-hidden="true"
						className="absolute inset-0 -m-0.5 rounded-full bg-blue-bright/10"
					/>
				</>
			)}

			<span
				className={cn(
					"relative flex shrink-0 items-center justify-center rounded-full font-sans font-bold tabular-nums transition-all",
					isCurrent &&
						"bg-gradient-to-br from-blue-bright to-mint text-white shadow-soft ring-2 ring-blue-bright/30",
					isDone && "bg-blue-bright-fill text-white shadow-soft",
					!isCurrent &&
						!isDone &&
						"border-[1.5px] border-dashed border-blue-tint-2 bg-surface text-ink-3",
					className,
				)}
			>
				{isDone ? (
					<Check className={cn("size-3.5", iconClassName)} strokeWidth={3} />
				) : (
					order
				)}
			</span>
		</span>
	);
}
