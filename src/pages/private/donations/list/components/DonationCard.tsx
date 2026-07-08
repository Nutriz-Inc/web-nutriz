import { Calendar, ChevronRight, Heart } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

type DonationCardProps = {
	number: number;
	isInProgress: boolean;
	createdAt: string;
	currentStep: number;
	totalSteps: number;
	stepLabel?: string;
	onClick?: () => void;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
});

function formatCreatedAt(createdAt: string) {
	const date = new Date(createdAt);
	return `${dateFormatter.format(date)} - ${timeFormatter.format(date)}`;
}

export function DonationCard({
	number,
	isInProgress,
	createdAt,
	currentStep,
	totalSteps,
	stepLabel,
	onClick,
}: DonationCardProps) {
	const formattedDate = formatCreatedAt(createdAt);

	if (isInProgress) {
		return (
			<button
				type="button"
				onClick={onClick}
				className="flex w-full flex-col gap-3 rounded-2xl bg-white p-4 text-left shadow-[0px_8px_16px_rgba(10,38,77,0.06)] active:scale-[0.99] transition-transform"
			>
				<div className="flex items-start gap-3">
					<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8f1fb]">
						<Heart className="size-5 text-[#387ccd]" />
					</span>
					<div className="flex min-w-0 flex-1 flex-col gap-2">
						<div className="flex items-center justify-between gap-2">
							<p className="text-[16px] font-bold text-[#0e2a45]">
								Doação #{number}
							</p>
							<ChevronRight className="size-5 shrink-0 text-[#9aa3b8]" />
						</div>
						<span className="w-fit rounded-full bg-[#e8f1fb] px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#387ccd]">
							Em andamento
						</span>
					</div>
				</div>

				<div className="flex items-center gap-2 text-[13px] text-[#6b8faa]">
					<Calendar className="size-4 shrink-0" />
					Criada em {formattedDate}
				</div>

				<div className="h-px bg-[#e3e9f2]" />

				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-0.5">
						<p className="text-[13px] font-bold text-[#0e2a45]">
							Etapa {currentStep} de {totalSteps}
						</p>
						{stepLabel && (
							<p className="text-[13px] text-[#6b8faa]">{stepLabel}</p>
						)}
					</div>
					<ProgressBar current={currentStep} total={totalSteps} />
				</div>
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className="flex w-full flex-col gap-2.5 rounded-2xl bg-white p-4 text-left shadow-[0px_8px_16px_rgba(10,38,77,0.06)] active:scale-[0.99] transition-transform"
		>
			<div className="flex items-center gap-3">
				<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fce4f0]">
					<Heart className="size-5 text-[#f2579f]" />
				</span>
				<p className="flex-1 text-[16px] font-bold text-[#0e2a45]">
					Doação #{number}
				</p>
				<span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#fce4f0] px-2.5 py-1 text-[11px] font-bold text-[#f2579f]">
					<span className="size-1.5 rounded-full bg-[#f2579f]" />
					Concluído
				</span>
			</div>

			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2 text-[13px] text-[#6b8faa]">
					<Calendar className="size-4 shrink-0" />
					Criada em {formattedDate}
				</div>
				<p className="shrink-0 text-[13px] font-bold text-[#0e2a45]">
					Etapa {totalSteps} de {totalSteps}
				</p>
			</div>
		</button>
	);
}
