import { Info, TriangleAlert } from "lucide-react";

export function AttentionNotice() {
	return (
		<div className="flex gap-3 rounded-2xl bg-[#dbe7f6] p-4 lg:gap-4 lg:p-5">
			<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#c4dbf5] lg:size-10">
				<TriangleAlert className="size-5 text-[#00458b] lg:hidden" />
				<Info className="hidden size-5 text-[#00458b] lg:block" />
			</div>

			<div className="flex flex-col gap-1">
				<p className="text-[15px] font-bold text-[#00458b] lg:text-[16px]">
					Atenção
				</p>
				<p className="text-[14px] leading-[20px] text-[#33536f] lg:text-[15px] lg:leading-[22px]">
					Ao confirmar, você será redirecionada para o WhatsApp da equipe
					Lactare para dar início ao processo de triagem.
				</p>
			</div>
		</div>
	);
}
