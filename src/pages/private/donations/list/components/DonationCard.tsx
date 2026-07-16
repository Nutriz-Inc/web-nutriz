import { Calendar, ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCreatedAt } from "@/utils/formatter";
import { ProgressBar } from "./ProgressBar";

type DonationCardProps = {
	number: number;
	isInProgress: boolean;
	createdAt: string;
	currentStep: number;
	totalSteps: number;
	stepLabel?: string;
	onClick?: () => void;
	className?: string;
};

export function DonationCard({
	number,
	isInProgress,
	createdAt,
	currentStep,
	totalSteps,
	stepLabel,
	onClick,
	className,
}: DonationCardProps) {
	const formattedDate = formatCreatedAt(createdAt);

	if (isInProgress) {
		return (
			<button
				type="button"
				onClick={onClick}
				className={cn(
					"flex w-full flex-col gap-3 rounded-2xl bg-white p-4 text-left shadow-[0px_8px_16px_rgba(10,38,77,0.06)] active:scale-[0.99] transition-transform lg:gap-5 lg:rounded-3xl lg:p-8",
					className,
				)}
			>
				<div className="flex items-start gap-3 lg:gap-4">
					<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8f1fb] lg:size-14">
						<Heart className="size-5 text-[#387ccd] lg:size-7" />
					</span>
					<div className="flex min-w-0 flex-1 flex-col gap-2 lg:gap-3">
						<div className="flex items-center justify-between gap-2">
							<p className="text-[16px] font-bold text-[#0e2a45] lg:text-[22px]">
								Doação #{number}
							</p>
							<ChevronRight className="size-5 shrink-0 text-[#9aa3b8] lg:size-6" />
						</div>
						<span className="w-fit rounded-full bg-[#e8f1fb] px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#387ccd] lg:px-3 lg:py-1.5 lg:text-[12px]">
							Em andamento
						</span>
					</div>
				</div>

				<div className="flex items-center gap-2 text-[13px] text-[#6b8faa] lg:gap-2.5 lg:text-[14px]">
					<Calendar className="size-4 shrink-0 lg:size-[18px]" />
					Criada em {formattedDate}
				</div>

				<div className="h-px bg-[#e3e9f2]" />

				<div className="flex flex-col gap-2.5 rounded-xl bg-[#f4f7fb] p-3.5 lg:gap-3 lg:rounded-2xl lg:p-5">
					<div className="flex items-center justify-between gap-2">
						<span className="text-[10px] font-bold uppercase tracking-wider text-[#6b8faa] lg:text-[11px]">
							Etapa atual
						</span>
						<span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-[#0e2a45] lg:text-[12px]">
							{currentStep}/{totalSteps}
						</span>
					</div>
					{stepLabel && (
						<p className="text-[16px] font-bold leading-tight text-[#0e2a45] lg:text-[19px]">
							{stepLabel}
						</p>
					)}
					<ProgressBar current={currentStep} total={totalSteps} />
				</div>
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex w-full flex-col gap-2.5 rounded-2xl bg-white p-4 text-left shadow-[0px_8px_16px_rgba(10,38,77,0.06)] active:scale-[0.99] transition-transform lg:flex-row lg:items-center lg:gap-4 lg:px-6 lg:py-5",
				className,
			)}
		>
			<div className="flex items-center gap-3 lg:shrink-0">
				<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fce4f0] lg:size-12">
					<Heart className="size-5 text-[#f2579f]" />
				</span>
				<p className="flex-1 text-[16px] font-bold text-[#0e2a45] lg:flex-none">
					Doação #{number}
				</p>
				<span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#fce4f0] px-2.5 py-1 text-[11px] font-bold text-[#f2579f] lg:hidden">
					<span className="size-1.5 rounded-full bg-[#f2579f]" />
					Concluído
				</span>
			</div>

			<div className="flex items-center justify-between gap-2 lg:ml-auto">
				<div className="flex items-center gap-2 text-[13px] text-[#6b8faa]">
					<Calendar className="size-4 shrink-0" />
					Criada em {formattedDate}
				</div>
			</div>

			<div className="hidden items-center gap-3 lg:flex lg:shrink-0">
				<span className="flex items-center gap-1.5 rounded-full bg-[#fce4f0] px-2.5 py-1 text-[11px] font-bold text-[#f2579f]">
					<span className="size-1.5 rounded-full bg-[#f2579f]" />
					Concluído
				</span>
				<ChevronRight className="size-5 text-[#9aa3b8]" />
			</div>
		</button>
	);
}
