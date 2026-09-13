import type { ReactNode } from "react";

type RelatorioSecaoProps = {
	titulo: string;
	nota?: string;
	children: ReactNode;
};

export function RelatorioSecao({
	titulo,
	nota,
	children,
}: RelatorioSecaoProps) {
	return (
		<section className="relatorio-secao">
			<div className="relatorio-secao-topo">
				<h2 className="relatorio-secao-titulo">{titulo}</h2>
				{nota ? <p className="relatorio-secao-nota">{nota}</p> : null}
			</div>
			{children}
		</section>
	);
}
