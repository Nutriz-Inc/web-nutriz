import { Info } from "lucide-react";

type Props = {
	text: string;
};

export function StepAboutCard({ text }: Props) {
	return (
		<div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-surface-2 p-[18px] shadow-soft">
			<div className="flex items-center gap-[7px]">
				<Info className="size-[15px] text-ink" />
				<p className="text-[13px] font-bold text-ink">Sobre esta etapa</p>
			</div>
			<p className="text-[13px] leading-[19px] text-ink-3">{text}</p>
		</div>
	);
}
