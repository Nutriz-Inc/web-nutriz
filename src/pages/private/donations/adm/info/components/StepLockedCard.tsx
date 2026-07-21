import { AlertTriangle, Lock } from "lucide-react";

type Props = {
	label: string;
	donationEnded?: boolean;
};

export function StepLockedCard({ label, donationEnded }: Props) {
	if (donationEnded) {
		return (
			<div className="flex flex-col gap-5 rounded-2xl border border-[#f3caca] bg-[#fef5f5] p-6">
				<div className="flex items-center gap-3.5">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#fcebeb]">
						<AlertTriangle className="size-5 text-[#a32d2d]" />
					</div>
					<p className="text-[17px] font-bold text-[#a32d2d]">{label}</p>
				</div>
				<div className="flex items-center gap-2.5 rounded-xl bg-[#fcebeb] px-[18px] py-4">
					<AlertTriangle className="size-[15px] shrink-0 text-[#a32d2d]" />
					<p className="text-[13px] text-[#a32d2d]">
						Doação encerrada — uma etapa anterior foi marcada como erro.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-5 rounded-2xl border border-[#e7eaef] bg-[#fafbfc] p-6">
			<div className="flex items-center gap-3.5">
				<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eef2f7]">
					<Lock className="size-5 text-[#9ca3af]" />
				</div>
				<p className="text-[17px] font-bold text-[#9ca3af]">{label}</p>
			</div>
			<div className="flex items-center gap-2.5 rounded-xl bg-[#eef2f7] px-[18px] py-4">
				<Lock className="size-[15px] shrink-0 text-[#9ca3af]" />
				<p className="text-[13px] text-[#6b7280]">
					Disponível automaticamente após a conclusão da etapa anterior.
				</p>
			</div>
		</div>
	);
}
