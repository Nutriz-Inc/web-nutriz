import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CountUp } from "@/components/full/CountUp";
import { cn } from "@/lib/utils";

type TomDoNumero = "neutro" | "atencao" | "grave" | "em-dia";

type CelulaDeNumeroProps = {
	valor: ReactNode;
	rotulo: string;
	detalhe?: ReactNode;
	tom?: TomDoNumero;
	para?: string;
	className?: string;
};

const COR_DO_TOM: Record<TomDoNumero, string> = {
	neutro: "text-ink",
	atencao: "text-orange",
	grave: "text-danger",
	"em-dia": "text-ink-3",
};

export function CelulaDeNumero({
	valor,
	rotulo,
	detalhe,
	tom = "neutro",
	para,
	className,
}: CelulaDeNumeroProps) {
	const conteudo = (
		<>
			<span
				className={cn(
					"text-secao font-semibold leading-none tracking-tight tabular-nums",
					COR_DO_TOM[tom],
				)}
			>
				{typeof valor === "number" ? <CountUp value={valor} /> : valor}
			</span>
			<span className="text-rotulo leading-snug text-ink-2">{rotulo}</span>
			{detalhe ? (
				<span className="text-rotulo leading-snug text-ink-3">{detalhe}</span>
			) : null}
		</>
	);

	const base = cn(
		"flex min-w-0 flex-col gap-1.5 bg-surface px-4 py-3.5",
		className,
	);

	if (para) {
		return (
			<Link
				to={para}
				className={cn(
					base,
					"transition-colors duration-150 hover:bg-surface-2 focus-visible:bg-surface-2 focus-visible:outline-none",
				)}
			>
				{conteudo}
			</Link>
		);
	}

	return <div className={base}>{conteudo}</div>;
}
