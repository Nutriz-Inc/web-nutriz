import { Info } from "lucide-react";

type Props = {
	text: string;
};

export function StepAboutCard({ text }: Props) {
	return (
		<div className="flex flex-col gap-2.5 rounded-[14px] border border-[#e3eaf2] bg-[#f7fafd] p-[18px] shadow-[0px_6px_10px_rgba(15,26,51,0.06)]">
			<div className="flex items-center gap-[7px]">
				<Info className="size-[15px] text-[#1b2a41]" />
				<p className="text-[13px] font-bold text-[#1b2a41]">Sobre esta etapa</p>
			</div>
			<p className="text-[13px] leading-[19px] text-[#7a8aa0]">{text}</p>
		</div>
	);
}
