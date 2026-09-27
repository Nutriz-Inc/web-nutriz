import logoNutriz from "@/assets/images/nutriz-logo-branco.svg";

type RelatorioFaixaTopoProps = {
	titulo?: string;
	subtitulo?: string;
	periodo?: string | null;
	emissao: string;
	emitidoPor: string;
};

export function RelatorioFaixaTopo({
	titulo = "Relatório de Indicadores",
	subtitulo = "Painel administrativo · Banco de leite humano",
	periodo,
	emissao,
	emitidoPor,
}: RelatorioFaixaTopoProps) {
	return (
		<header className="relatorio-topo">
			<div className="relatorio-topo-marca">
				<img src={logoNutriz} alt="Nutriz" className="relatorio-logo" />
				<div className="relatorio-topo-titulos">
					<h1 className="relatorio-titulo">{titulo}</h1>
					<p className="relatorio-subtitulo">{subtitulo}</p>
				</div>
			</div>

			<dl className="relatorio-topo-meta">
				{periodo ? (
					<>
						<dt>Período</dt>
						<dd>{periodo}</dd>
					</>
				) : null}
				<dt>Emitido em</dt>
				<dd>{emissao}</dd>
				<dt>Emitido por</dt>
				<dd>{emitidoPor}</dd>
			</dl>
		</header>
	);
}
