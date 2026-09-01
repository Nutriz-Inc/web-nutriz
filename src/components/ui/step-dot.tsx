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
						className="absolute inset-0 -m-[3px] rounded-full bg-blue-bright/10"
					/>
					<span
						aria-hidden="true"
						className="absolute inset-0 -m-[3px] rounded-full border-2 border-transparent border-t-blue-bright border-r-blue-bright/35 motion-safe:giro-etapa"
					/>
				</>
			)}

			<span
				className={cn(
					"relative flex shrink-0 items-center justify-center rounded-full font-sans font-bold tabular-nums transition-all duration-300",
					isCurrent &&
						"bg-surface text-blue-bright ring-2 ring-blue-bright/45 ring-inset",
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
