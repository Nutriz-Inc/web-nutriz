export type ColunaDaFaixa = {
	rotulo: string;
	valor: string;
};

type RelatorioFaixaDeDadosProps = {
	colunas: ColunaDaFaixa[];
};

export function RelatorioFaixaDeDados({ colunas }: RelatorioFaixaDeDadosProps) {
	return (
		<table className="relatorio-faixa">
			<thead>
				<tr>
					{colunas.map((coluna) => (
						<th key={coluna.rotulo} scope="col">
							{coluna.rotulo}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				<tr>
					{colunas.map((coluna) => (
						<td key={coluna.rotulo}>{coluna.valor}</td>
					))}
				</tr>
			</tbody>
		</table>
	);
}
