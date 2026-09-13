import logoNutriz from "@/assets/images/nutriz-logo.svg";

type RelatorioFaixaTopoProps = {
	periodo: string;
	emissao: string;
	emitidoPor: string;
};

export function RelatorioFaixaTopo({
	periodo,
	emissao,
	emitidoPor,
}: RelatorioFaixaTopoProps) {
	return (
		<header className="relatorio-topo">
			<div className="relatorio-topo-marca">
				<img src={logoNutriz} alt="Nutriz" className="relatorio-logo" />
				<div className="relatorio-topo-titulos">
					<h1 className="relatorio-titulo">Relatório de Indicadores</h1>
					<p className="relatorio-subtitulo">
						Painel administrativo · Banco de leite humano
					</p>
				</div>
			</div>

			<dl className="relatorio-topo-meta">
				<dt>Período</dt>
				<dd>{periodo}</dd>
				<dt>Emitido em</dt>
				<dd>{emissao}</dd>
				<dt>Emitido por</dt>
				<dd>{emitidoPor}</dd>
			</dl>
		</header>
	);
}
