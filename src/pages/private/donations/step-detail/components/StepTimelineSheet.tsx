import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useStepTimelines } from "../hooks";
import { TimelineEntry } from "./TimelineEntry";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	idDonationStep: string;
	stepOrder?: number;
	stepTitle?: string;
};

export function StepTimelineSheet({
	open,
	onOpenChange,
	idDonationStep,
	stepOrder,
	stepTitle,
}: Props) {
	const { timelinesQuery } = useStepTimelines(idDonationStep, open);
	const timelines = timelinesQuery.data?.data ?? [];

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="bottom"
				className="rounded-t-2xl border-none lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:data-[side=bottom]:inset-x-auto lg:data-[side=bottom]:left-auto lg:data-[side=bottom]:right-8 lg:data-[side=bottom]:bottom-8 lg:data-[side=bottom]:w-[420px] lg:data-[side=bottom]:rounded-2xl lg:data-[side=bottom]:border lg:data-[side=bottom]:border-[#e0e0e0] lg:data-[side=bottom]:shadow-2xl p-2"
			>
				<div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-[#e0e0e0] lg:hidden" />

				<SheetHeader className="gap-1 px-5 pb-0 pt-3 text-left">
					<SheetTitle className="text-[14px] font-bold text-[#1a1a1a]">
						Linha do tempo{stepOrder ? ` — Etapa ${stepOrder}` : ""}
						{stepTitle ? `: ${stepTitle}` : ""}
					</SheetTitle>
					<SheetDescription className="text-[11px] text-[#888]">
						Histórico de atualizações desta etapa.
					</SheetDescription>
				</SheetHeader>

				<div className="flex max-h-[60vh] flex-col overflow-y-auto px-5 pb-6 pt-4">
					{timelinesQuery.isLoading ? (
						<div className="flex flex-col gap-3">
							{[0, 1, 2].map((index) => (
								<div
									key={index}
									className="h-14 w-full animate-pulse rounded-xl bg-[#f4f7fb]"
								/>
							))}
						</div>
					) : timelines.length === 0 ? (
						<p className="py-4 text-center text-[13px] text-[#888]">
							Nenhum registro encontrado para esta etapa ainda.
						</p>
					) : (
						timelines.map((entry, index) => (
							<TimelineEntry
								key={entry.id_donation_step_timeline}
								entry={entry}
								isLast={index === timelines.length - 1}
							/>
						))
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
