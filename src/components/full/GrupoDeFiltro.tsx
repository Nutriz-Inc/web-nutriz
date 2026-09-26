import type { ReactNode } from "react";

type GrupoDeFiltroProps = {
	rotulo: string;
	children: ReactNode;
};

export function GrupoDeFiltro({ rotulo, children }: GrupoDeFiltroProps) {
	return (
		<fieldset className="flex min-w-0 flex-col gap-2">
			<legend className="mb-2 text-[11px] font-bold uppercase tracking-[0.06em] text-ink-2">
				{rotulo}
			</legend>
			<div className="flex flex-wrap gap-2">{children}</div>
		</fieldset>
	);
}
