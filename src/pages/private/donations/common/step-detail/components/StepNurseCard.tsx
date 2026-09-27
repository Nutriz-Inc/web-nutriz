import { StatusBadge } from "@/components/full/StatusBadge";
import { getInitials } from "@/components/layout/utils";
import type { EnumJobStatus } from "@/services/types/i-job";
import { jobToken } from "@/utils/status";

type Props = {
	nurseName: string;
	status: EnumJobStatus;
};

export function StepNurseCard({ nurseName, status }: Props) {
	return (
		<section className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6 shadow-soft">
			<p className="text-rotulo font-semibold uppercase tracking-[0.1em] text-ink-3">
				Quem vai te atender
			</p>
			<div className="flex items-center gap-4">
				<span
					aria-hidden="true"
					className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-tint text-apoio font-bold text-blue-deep"
				>
					{getInitials(nurseName)}
				</span>
				<div className="flex min-w-0 flex-col gap-1">
					<span className="truncate text-corpo font-semibold text-ink">
						{nurseName}
					</span>
					<span className="text-apoio text-ink-2">Enfermeiro responsável</span>
				</div>
			</div>
			<div className="flex items-center justify-between gap-3 border-t border-line pt-4">
				<span className="text-apoio text-ink-2">Visita</span>
				<StatusBadge token={jobToken(status)} size="md" className="shrink-0" />
			</div>
		</section>
	);
}
