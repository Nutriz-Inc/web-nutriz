export type ColunaDaFaixa = {
	rotulo: string;
	valor: string;
};

type RelatorioFaixaDeDadosProps = {
	colunas: ColunaDaFaixa[];
};

export function RelatorioFaixaDeDados({ colunas }: RelatorioFaixaDeDadosProps) {
	return (
		<dl className="relatorio-faixa">
			{colunas.map((coluna) => (
				<div key={coluna.rotulo} className="relatorio-faixa-item">
					<dt>{coluna.rotulo}</dt>
					<dd>{coluna.valor}</dd>
				</div>
			))}
		</dl>
	);
}
