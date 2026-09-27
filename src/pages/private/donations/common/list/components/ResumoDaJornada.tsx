import { CountUp } from "@/components/full/CountUp";
import { formatDateBR } from "@/utils/formatter";
import type { DoacaoDaLista } from "../types";
import { DoacoesPorMes } from "./DoacoesPorMes";
import { ImpactoNaJornada } from "./ImpactoNaJornada";

type ResumoDaJornadaProps = {
	doacoes: DoacaoDaLista[];
	mlDoados: number;
};

export function ResumoDaJornada({ doacoes, mlDoados }: ResumoDaJornadaProps) {
	const concluidas = doacoes.filter(
		(doacao) => !doacao.ativa && !doacao.comErro,
	).length;
	const recorrentes = doacoes.filter((doacao) => doacao.recorrente).length;
	const primeira = doacoes.reduce<string | undefined>(
		(maisAntiga, doacao) =>
			!maisAntiga || doacao.criadaEm < maisAntiga
				? doacao.criadaEm
				: maisAntiga,
		undefined,
	);

	return (
		<section
			aria-label="Resumo das suas doações"
			className="flex h-full flex-col justify-between gap-6 rounded-card border border-line bg-surface p-6 shadow-soft sm:p-8"
		>
			<div className="flex flex-col gap-1">
				<p className="text-rotulo font-semibold uppercase tracking-[0.12em] text-ink-3">
					Sua jornada
				</p>
				<p className="flex items-baseline gap-2">
					<span className="font-display text-pagina font-bold leading-none tracking-tight tabular-nums text-blue-deep">
						<CountUp value={doacoes.length} />
					</span>
					<span className="text-corpo font-semibold text-ink">
						{doacoes.length === 1 ? "doação" : "doações"}
					</span>
				</p>
				{primeira ? (
					<p className="text-apoio text-ink-2">
						A primeira foi em {formatDateBR(primeira)}
					</p>
				) : null}
			</div>

			<ImpactoNaJornada mlDoados={mlDoados} />

			<DoacoesPorMes doacoes={doacoes} />

			<dl className="grid grid-cols-2 divide-x divide-line border-t border-line pt-5">
				<div className="flex flex-col gap-1 pr-4">
					<dt className="text-rotulo text-ink-2">Concluídas</dt>
					<dd className="text-secao font-semibold leading-none tabular-nums text-success">
						<CountUp value={concluidas} />
					</dd>
				</div>
				<div className="flex flex-col gap-1 pl-4">
					<dt className="text-rotulo text-ink-2">Recorrentes</dt>
					<dd className="text-secao font-semibold leading-none tabular-nums text-teal">
						<CountUp value={recorrentes} />
					</dd>
				</div>
			</dl>
		</section>
	);
}
