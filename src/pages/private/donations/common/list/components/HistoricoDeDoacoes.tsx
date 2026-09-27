import type { DoacaoDaLista } from "../types";
import { LinhaDoHistorico } from "./LinhaDoHistorico";

type HistoricoDeDoacoesProps = {
	doacoes: DoacaoDaLista[];
	podeAbrir: (doacao: DoacaoDaLista) => boolean;
	onAbrir: (doacao: DoacaoDaLista) => void;
};

export function HistoricoDeDoacoes({
	doacoes,
	podeAbrir,
	onAbrir,
}: HistoricoDeDoacoesProps) {
	return (
		<section aria-labelledby="titulo-historico" className="flex flex-col gap-3">
			<div className="flex items-baseline justify-between gap-3 px-1">
				<h2
					id="titulo-historico"
					className="text-destaque font-bold tracking-tight text-ink"
				>
					Histórico
				</h2>
				<span className="text-apoio text-ink-3">
					{doacoes.length} {doacoes.length === 1 ? "doação" : "doações"}
				</span>
			</div>
			<ol className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface shadow-soft">
				{doacoes.map((doacao, indice) => (
					<LinhaDoHistorico
						key={doacao.id}
						doacao={doacao}
						indice={indice}
						onAbrir={podeAbrir(doacao) ? () => onAbrir(doacao) : undefined}
					/>
				))}
			</ol>
		</section>
	);
}
