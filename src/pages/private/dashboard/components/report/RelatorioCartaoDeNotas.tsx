export type NotaDoRelatorio = {
	chave: string;
	rotulo: string;
	valor: string;
};

type RelatorioCartaoDeNotasProps = {
	titulo: string;
	notas: NotaDoRelatorio[];
};

export function RelatorioCartaoDeNotas({
	titulo,
	notas,
}: RelatorioCartaoDeNotasProps) {
	return (
		<section className="relatorio-nota">
			<h2 className="relatorio-nota-titulo">{titulo}</h2>
			<ul className="relatorio-nota-lista">
				{notas.map((nota) => (
					<li key={nota.chave} className="relatorio-nota-item">
						<span>{nota.rotulo}</span>
						<strong>{nota.valor}</strong>
					</li>
				))}
			</ul>
		</section>
	);
}
