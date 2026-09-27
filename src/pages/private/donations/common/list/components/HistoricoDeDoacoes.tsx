import { formatDateBR } from "@/utils/formatter";
import type { DoacaoDaLista } from "../types";
import { CartaoDoHistorico } from "./CartaoDoHistorico";

type HistoricoDeDoacoesProps = {
	doacoes: DoacaoDaLista[];
	primeiraEm?: string;
	podeAbrir: (doacao: DoacaoDaLista) => boolean;
	onAbrir: (doacao: DoacaoDaLista) => void;
};

export function HistoricoDeDoacoes({
	doacoes,
	primeiraEm,
	podeAbrir,
	onAbrir,
}: HistoricoDeDoacoesProps) {
	const concluidas = doacoes.filter(
		(doacao) => !doacao.ativa && !doacao.comErro,
	).length;

	return (
		<section aria-labelledby="titulo-historico" className="flex flex-col gap-4">
			<div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 px-1">
				<h2
					id="titulo-historico"
					className="font-display text-secao font-bold tracking-tight text-ink"
				>
					Histórico
				</h2>
				<p className="text-apoio text-ink-3">
					{concluidas} {concluidas === 1 ? "concluída" : "concluídas"}
					{primeiraEm ? ` · doando desde ${formatDateBR(primeiraEm)}` : ""}
				</p>
			</div>
			<ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{doacoes.map((doacao, indice) => (
					<CartaoDoHistorico
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
