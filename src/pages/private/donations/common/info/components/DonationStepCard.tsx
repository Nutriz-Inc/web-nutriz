import type { LucideIcon } from "lucide-react";
import { Check, ChevronRight } from "lucide-react";
import type { CSSProperties } from "react";
import { InteractiveCard } from "@/components/full/InteractiveCard";
import { Badge } from "@/components/ui/badge";
import { StepDot } from "@/components/ui/step-dot";
import { cn } from "@/lib/utils";
import { formatDateTimeParts } from "@/utils/formatter";
import { BADGE_LABEL, BADGE_TONE, type StepVisualStatus } from "../constants";

interface Props {
	order: number;
	title: string;
	description: string;
	setDate?: string;
	completedAt?: string;
	icon: LucideIcon;
	visualStatus: StepVisualStatus;
	isLast: boolean;
	justChanged?: boolean;
	onClick?: () => void;
}

export function DonationStepCard({
	order,
	title,
	description,
	setDate,
	completedAt,
	icon: Icon,
	visualStatus,
	isLast,
	justChanged = false,
	onClick,
}: Props) {
	const isCurrent = visualStatus === "current";
	const isDone = visualStatus === "done";
	const isClickable = Boolean(onClick);

	const stampSource = completedAt ?? (isCurrent ? setDate : undefined);
	const stamp = stampSource ? formatDateTimeParts(stampSource) : undefined;

	return (
		<div
			className="entra flex gap-3.5 lg:gap-4"
			style={{ "--i": order - 1 } as CSSProperties}
		>
			<div className="flex flex-col items-center">
				<StepDot
					status={visualStatus}
					order={order}
					celebrate={justChanged && isDone}
					className={isCurrent ? "size-9 text-apoio" : "size-7 text-rotulo"}
				/>

				{!isLast && (
					<div
						className={cn(
							"my-1.5 flex-1",
							isDone
								? "w-0.5 rounded-full bg-blue-bright-fill motion-safe:leite-desce"
								: "w-0 border-l-2 border-dashed border-blue-tint-2",
						)}
						style={{ "--i": order - 1 } as CSSProperties}
					/>
				)}
			</div>

			<InteractiveCard
				onClick={onClick}
				disabled={!isClickable}
				className={cn(
					"mb-4 w-auto flex-1 rounded-xl p-3.5 lg:rounded-2xl lg:p-5",
					isCurrent
						? "bg-blue-tint/70"
						: isDone
							? "bg-surface-3"
							: "bg-surface-2",
				)}
			>
				{justChanged && (
					<>
						<span
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 rounded-[inherit] motion-safe:aura-etapa"
						/>
						<span
							aria-hidden="true"
							className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-blue-bright/20 to-transparent motion-safe:varredura-etapa"
						/>
					</>
				)}

				<div className="flex items-start gap-3">
					<div className="flex min-w-0 flex-1 flex-col gap-2">
						<div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
							<Icon
								className={cn(
									"size-[18px] shrink-0",
									isCurrent
										? "text-blue-bright"
										: isDone
											? "text-success"
											: "text-ink-3",
								)}
							/>

							<p
								className={cn(
									"min-w-0 break-words font-bold",
									isCurrent
										? "text-corpo text-ink lg:text-destaque"
										: isDone
											? "text-corpo text-ink lg:text-corpo"
											: "text-corpo text-ink-3 lg:text-corpo",
								)}
							>
								{title}
							</p>

							<Badge
								tone={BADGE_TONE[visualStatus]}
								size="sm"
								caps
								dot={isCurrent}
								className="px-2 py-0.5 text-rotulo tracking-wider lg:text-rotulo"
							>
								{isDone && <Check className="size-3" strokeWidth={3} />}
								{BADGE_LABEL[visualStatus]}
							</Badge>
						</div>

						<p
							className={cn(
								"text-apoio leading-[19px] lg:text-apoio lg:leading-[20px]",
								isCurrent || isDone ? "text-ink-2" : "text-ink-3",
							)}
						>
							{description}
						</p>
					</div>

					<div className="flex shrink-0 items-start gap-2">
						<div className="flex flex-col items-end leading-tight">
							{stamp ? (
								<>
									<span className="text-rotulo font-semibold text-ink-2 lg:text-apoio">
										{stamp.date}
									</span>
									<span className="text-rotulo text-ink-3 lg:text-rotulo">
										{stamp.time}
									</span>
								</>
							) : (
								<span className="text-apoio text-ink-3">—</span>
							)}
						</div>

						{isClickable && (
							<ChevronRight className="mt-0.5 size-5 shrink-0 text-ink-3" />
						)}
					</div>
				</div>
			</InteractiveCard>
		</div>
	);
}
