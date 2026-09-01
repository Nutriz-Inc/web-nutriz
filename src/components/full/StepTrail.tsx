import type { ReactNode } from "react";
import { StepDot, type StepDotStatus } from "@/components/ui/step-dot";
import { cn } from "@/lib/utils";

export type StepTrailItem = {
	key: string;
	order: number;
	label: string;
	subLabel?: string;
	status: StepDotStatus;
	trailingSlot?: ReactNode;
};

type StepTrailProps = {
	items: StepTrailItem[];
	className?: string;
};

export function StepTrail({ items, className }: StepTrailProps) {
	return (
		<ol className={cn("flex flex-col", className)}>
			{items.map((item, index) => {
				const isLast = index === items.length - 1;
				const isDone = item.status === "done";
				const isCurrent = item.status === "current";
				const isFailed = item.status === "failed";

				return (
					<li key={item.key} className="flex gap-3.5">
						<div className="flex flex-col items-center">
							<StepDot
								status={item.status}
								order={item.order}
								className="size-7 text-[12px]"
							/>

							{!isLast && (
								<div
									className={cn(
										"my-1.5 flex-1",
										isDone
											? "w-0.5 rounded-full bg-blue-bright-fill"
											: "w-0 border-l-2 border-dashed border-blue-tint-2",
									)}
								/>
							)}
						</div>

						<div
							className={cn(
								"flex min-w-0 flex-1 items-start justify-between gap-2",
								isLast ? "pb-0.5" : "pb-4",
							)}
						>
							<div className="flex min-w-0 flex-col gap-px">
								<p
									className={cn(
										"text-[14px]",
										isFailed
											? "font-bold text-danger"
											: isCurrent
												? "font-bold text-ink"
												: isDone
													? "font-semibold text-ink"
													: "font-semibold text-ink-3",
									)}
								>
									{item.label}
								</p>

								{item.subLabel && (
									<p
										className={cn(
											"text-[11px]",
											isFailed ? "text-danger" : "text-ink-3",
										)}
									>
										{item.subLabel}
									</p>
								)}
							</div>

							{item.trailingSlot}
						</div>
					</li>
				);
			})}
		</ol>
	);
}
