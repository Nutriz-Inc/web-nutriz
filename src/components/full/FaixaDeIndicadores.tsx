import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Indicador = {
	chave: string;
	rotulo: string;
	valor: ReactNode;
	detalhe?: string;
	tom?: "neutro" | "marca" | "atencao" | "perigo";
};

const COR_DO_VALOR: Record<NonNullable<Indicador["tom"]>, string> = {
	neutro: "text-ink",
	marca: "text-blue",
	atencao: "text-orange",
	perigo: "text-danger",
};

type FaixaDeIndicadoresProps = {
	indicadores: Indicador[];
	rotulo: string;
	className?: string;
};

export function FaixaDeIndicadores({
	indicadores,
	rotulo,
	className,
}: FaixaDeIndicadoresProps) {
	return (
		<section
			aria-label={rotulo}
			className={cn(
				"grid grid-cols-2 overflow-hidden rounded-card-sm border border-line bg-surface lg:grid-cols-[repeat(var(--quantidade),minmax(0,1fr))]",
				className,
			)}
			style={{ "--quantidade": indicadores.length } as CSSProperties}
		>
			{indicadores.map((indicador) => (
				<div
					key={indicador.chave}
					className="flex min-w-0 flex-col gap-1.5 border-line p-4 not-last:border-b odd:border-r lg:border-b-0 lg:border-r lg:p-6 lg:last:border-r-0 [&:nth-last-child(2):nth-child(odd)]:border-b-0"
				>
					<p
						className={cn(
							"text-titulo font-bold leading-none tabular-nums lg:text-numero",
							COR_DO_VALOR[indicador.tom ?? "neutro"],
						)}
					>
						{indicador.valor}
					</p>
					<p className="text-apoio font-semibold text-ink">
						{indicador.rotulo}
					</p>
					{indicador.detalhe && (
						<p className="text-rotulo text-ink-3">{indicador.detalhe}</p>
					)}
				</div>
			))}
		</section>
	);
}
