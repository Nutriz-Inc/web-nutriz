import type { ReactNode } from "react";

type RelatorioCartaoDestacadoProps = {
	rotulo: string;
	detalhe: string;
	children: ReactNode;
};

export function RelatorioCartaoDestacado({
	rotulo,
	detalhe,
	children,
}: RelatorioCartaoDestacadoProps) {
	return (
		<div className="relatorio-cartao">
			{children}
			<div className="relatorio-cartao-texto">
				<p className="relatorio-cartao-rotulo">{rotulo}</p>
				<p className="relatorio-cartao-detalhe">{detalhe}</p>
			</div>
		</div>
	);
}
