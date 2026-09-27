import type { ReactNode } from "react";

type GrupoDeFiltroProps = {
	rotulo: string;
	children: ReactNode;
};

export function GrupoDeFiltro({ rotulo, children }: GrupoDeFiltroProps) {
	return (
		<fieldset className="m-0 flex min-w-0 flex-wrap items-center gap-1.5 border-0 p-0 [&_button]:h-8 [&_button]:px-3.5 [&_button]:py-0 [&_button]:text-[12.5px]">
			<legend className="float-left mr-1 whitespace-nowrap p-0 text-[12px] font-semibold text-ink-2">
				{rotulo}
			</legend>
			{children}
		</fieldset>
	);
}
