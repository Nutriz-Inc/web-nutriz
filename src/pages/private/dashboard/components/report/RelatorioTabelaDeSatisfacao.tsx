import type { FeedbackScoreCount } from "@/services/types/i-dashboard";

type RelatorioTabelaDeSatisfacaoProps = {
	feedbackByScore: FeedbackScoreCount[];
	total: number;
};

const NOTAS = [5, 4, 3, 2, 1];

export function RelatorioTabelaDeSatisfacao({
	feedbackByScore,
	total,
}: RelatorioTabelaDeSatisfacaoProps) {
	const porNota = new Map(
		feedbackByScore.map((item) => [item.score, item.count]),
	);

	return (
		<table className="relatorio-tabela">
			<thead>
				<tr>
					<th scope="col">Nota atribuída</th>
					<th scope="col">Avaliações</th>
					<th scope="col">%</th>
				</tr>
			</thead>
			<tbody>
				{NOTAS.map((nota) => {
					const quantidade = porNota.get(nota) ?? 0;

					return (
						<tr key={nota}>
							<td>
								<span className="relatorio-tabela-marca">
									<i data-tom={nota >= 4 ? "positivo" : "neutro"} />
									{nota} {nota === 1 ? "estrela" : "estrelas"}
								</span>
							</td>
							<td>{quantidade}</td>
							<td>{total ? Math.round((quantidade / total) * 100) : 0}%</td>
						</tr>
					);
				})}
				<tr>
					<td>
						<span className="relatorio-tabela-marca">Total de avaliações</span>
					</td>
					<td>{total}</td>
					<td>100%</td>
				</tr>
			</tbody>
		</table>
	);
}
