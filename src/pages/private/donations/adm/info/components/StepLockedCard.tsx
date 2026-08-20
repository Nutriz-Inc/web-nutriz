import { AlertTriangle, Lock } from "lucide-react";

type Props = {
	label: string;
	donationEnded?: boolean;
};

export function StepLockedCard({ label, donationEnded }: Props) {
	if (donationEnded) {
		return (
			<div className="flex flex-col gap-5 rounded-2xl border border-danger-tint bg-surface-2 p-6">
				<div className="flex items-center gap-3.5">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-danger-tint">
						<AlertTriangle className="size-5 text-danger" />
					</div>
					<p className="text-[16px] font-bold text-danger">{label}</p>
				</div>
				<div className="flex items-center gap-2.5 rounded-xl bg-danger-tint px-[18px] py-4">
					<AlertTriangle className="size-[15px] shrink-0 text-danger" />
					<p className="text-[13px] text-danger">
						Doação encerrada — uma etapa anterior foi marcada como erro.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface-2 p-6">
			<div className="flex items-center gap-3.5">
				<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-3">
					<Lock className="size-5 text-ink-3" />
				</div>
				<p className="text-[16px] font-bold text-ink-3">{label}</p>
			</div>
			<div className="flex items-center gap-2.5 rounded-xl bg-surface-3 px-[18px] py-4">
				<Lock className="size-[15px] shrink-0 text-ink-3" />
				<p className="text-[13px] text-ink-2">
					Disponível automaticamente após a conclusão da etapa anterior.
				</p>
			</div>
		</div>
	);
}
