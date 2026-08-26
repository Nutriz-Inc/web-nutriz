import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Calendar, Check, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { formatCreatedAt } from "@/utils/formatter";
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
	/** Etapa que acabou de mudar de estado enquanto a tela estava aberta. */
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
	const hasCurrentDetails = isCurrent && Boolean(setDate);
	const hasCompletedInfo = Boolean(completedAt);
	const isClickable = Boolean(onClick);

	const reduzirMovimento = useReducedMotion();
	const animar = isClickable && !reduzirMovimento;

	// Mesma pausa do card da lista: o card responde antes de a rota trocar.
	function handleClick() {
		if (!onClick) {
			return;
		}
		if (!animar) {
			onClick();
			return;
		}
		window.setTimeout(onClick, 140);
	}

	return (
		<div className="flex gap-4">
			<div className="flex flex-col items-center">
				{/*
				 * Tres estados legiveis de relance: concluida (cheia, com visto),
				 * atual (halo em volta, para puxar o olho) e futura (contorno
				 * tracejado, sinalizando que ainda nao aconteceu).
				 */}
				<div className="relative flex shrink-0 items-center justify-center">
					{isCurrent && (
						<>
							{/* pulso continuo marcando a etapa em que a nutriz esta */}
							<span
								aria-hidden="true"
								className="absolute inset-0 -m-1 rounded-full bg-eva/30 motion-safe:pulso-etapa"
							/>
							<span
								aria-hidden="true"
								className="absolute inset-0 -m-0.5 rounded-full bg-eva/10"
							/>
						</>
					)}

					<div
						className={cn(
							"relative flex shrink-0 items-center justify-center rounded-full font-bold tabular-nums transition-all",
							isCurrent
								? "size-9 bg-eva-fill text-[14px] text-white shadow-soft ring-2 ring-eva/30"
								: isDone
									? "size-7 bg-eva-fill text-white shadow-soft"
									: "size-7 border-[1.5px] border-dashed border-blue-tint-2 bg-surface text-[12px] text-ink-3",
						)}
					>
						{isDone ? <Check className="size-3.5" strokeWidth={3} /> : order}
					</div>
				</div>

				{!isLast && (
					<div
						className={cn(
							"w-0.5 flex-1 rounded-full",
							isDone
								? "bg-eva"
								: isCurrent
									? "bg-gradient-to-b from-eva to-blue-tint"
									: "bg-blue-tint",
						)}
					/>
				)}
			</div>

			<motion.button
				type="button"
				onClick={handleClick}
				disabled={!isClickable}
				whileHover={animar ? { x: 6 } : undefined}
				whileTap={animar ? { x: 2 } : undefined}
				transition={{ type: "spring", stiffness: 260, damping: 30 }}
				className={cn(
					"group relative flex-1 overflow-hidden rounded-2xl bg-surface text-left shadow-soft transition-[border-radius] disabled:cursor-default",
					isCurrent ? "mb-6 p-5" : "mb-4 p-3.5",
					isClickable && "hover:rounded-l-none focus-visible:rounded-l-none",
					!isCurrent && !isDone && "bg-surface-2",
					// Aviso momentaneo de que ESTA etapa acabou de mudar. Fica em
					// `motion-safe` porque e enfeite: com movimento reduzido a
					// mudanca ja chegou pelo texto, pelo estado e pelo toast.
					justChanged && "motion-safe:brilho-etapa",
				)}
			>
				{isClickable && (
					<span
						aria-hidden="true"
						className="absolute inset-y-0 left-0 w-1.5 origin-left scale-x-0 bg-blue-deep transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
					/>
				)}
				<div className="flex items-start gap-3">
					<div
						className={cn(
							"flex shrink-0 items-center justify-center rounded-full transition-all",
							isCurrent
								? "size-11 bg-blue-tint text-blue-deep"
								: isDone
									? "size-8 bg-success-tint text-success"
									: "size-8 bg-surface-3 text-ink-3",
						)}
					>
						<Icon className={isCurrent ? "size-5" : "size-4"} />
					</div>

					<p
						className={cn(
							"min-w-0 flex-1 break-words font-bold",
							isCurrent
								? "text-[16px] text-ink"
								: isDone
									? "text-[14px] text-ink/80"
									: "text-[14px] text-ink-3",
						)}
					>
						{title}
					</p>

					<ChevronRight
						className={cn(
							"mt-0.5 shrink-0",
							isCurrent ? "size-5 text-ink-3" : "size-4 text-blue-tint-2",
						)}
					/>
				</div>

				<div
					className={cn(
						"mt-1.5 flex flex-col gap-1.5",
						isCurrent ? "pl-14" : "pl-11",
					)}
				>
					<Badge
						tone={BADGE_TONE[visualStatus]}
						size="sm"
						className={isCurrent ? undefined : "px-2 py-0.5 text-[10px]"}
					>
						{BADGE_LABEL[visualStatus]}
					</Badge>

					<p
						className={
							isCurrent || isDone
								? "text-[13px] text-ink-2"
								: "text-[12px] text-ink-3"
						}
					>
						{description}
					</p>
				</div>

				{(hasCurrentDetails || hasCompletedInfo) && (
					<>
						<div
							className={cn("h-px bg-blue-tint", isCurrent ? "my-4" : "my-3")}
						/>

						<div className="flex flex-col gap-2">
							{isCurrent && setDate && (
								<div className="flex items-start gap-2">
									<Calendar className="mt-0.5 size-4 shrink-0 text-ink-3" />
									<p className="text-[14px] leading-[20px] text-ink-2">
										{formatCreatedAt(setDate)}
									</p>
								</div>
							)}

							{completedAt && (
								<div className="flex items-start gap-2">
									<Check className="mt-0.5 size-3.5 shrink-0 text-blue-deep" />
									<p
										className={cn(
											"leading-[18px] text-blue-deep",
											isCurrent ? "text-[13px]" : "text-[12px]",
										)}
									>
										Concluído em {formatCreatedAt(completedAt)}
									</p>
								</div>
							)}
						</div>
					</>
				)}
			</motion.button>
		</div>
	);
}
