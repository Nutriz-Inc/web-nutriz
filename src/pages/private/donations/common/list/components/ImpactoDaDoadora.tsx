import { CountUp } from "@/components/full/CountUp";
import { BABY_ML_PER_DAY } from "@/utils/constants";
import { FrascoDeLeite } from "./FrascoDeLeite";

const METAS_EM_ML = [1000, 2000, 5000, 10000, 20000, 50000, 100000];

type ImpactoDaDoadoraProps = {
	mlDoados: number;
};

function formatarLitros(ml: number) {
	return (ml / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

function formatarFalta(ml: number) {
	return ml >= 1000 ? `${formatarLitros(ml)} L` : `${Math.ceil(ml)} ml`;
}

export function ImpactoDaDoadora({ mlDoados }: ImpactoDaDoadoraProps) {
	const bebes = Math.floor(mlDoados / BABY_ML_PER_DAY);
	const meta =
		METAS_EM_ML.find((valor) => valor > mlDoados) ??
		Math.ceil((mlDoados + 1) / 100000) * 100000;
	const metaAnterior =
		[...METAS_EM_ML].reverse().find((valor) => valor <= mlDoados) ?? 0;
	const progresso = (mlDoados - metaAnterior) / (meta - metaAnterior);
	const falta = meta - mlDoados;
	const bebesNaMeta = Math.floor(meta / BABY_ML_PER_DAY) - bebes;

	return (
		<section
			aria-labelledby="impacto-da-doadora"
			className="flex h-full flex-col justify-between gap-6 rounded-card border border-line bg-surface p-6 shadow-soft sm:p-8"
		>
			<div className="flex items-start justify-between gap-4">
				<div className="flex min-w-0 flex-col gap-2">
					<h2
						id="impacto-da-doadora"
						className="text-rotulo font-semibold uppercase tracking-[0.12em] text-ink-3"
					>
						Seu impacto
					</h2>
					{mlDoados > 0 ? (
						<>
							<p className="flex items-baseline gap-2">
								<span className="font-display text-numero font-bold leading-none tracking-tight tabular-nums text-blue-deep">
									<CountUp value={bebes} />
								</span>
								<span className="text-corpo font-semibold text-ink">
									{bebes === 1 ? "bebê alimentado" : "bebês alimentados"}
								</span>
							</p>
							<p className="text-apoio text-ink-2">
								com os{" "}
								<strong className="font-semibold text-ink">
									{formatarLitros(mlDoados)} L
								</strong>{" "}
								de leite que você já doou
							</p>
						</>
					) : (
						<>
							<p className="font-display text-secao font-bold leading-tight tracking-tight text-blue-deep">
								Seu primeiro frasco já faz diferença
							</p>
							<p className="text-apoio text-ink-2">
								Com 1 L de leite, cerca de {Math.floor(1000 / BABY_ML_PER_DAY)}{" "}
								bebês prematuros se alimentam por um dia.
							</p>
						</>
					)}
				</div>
				<FrascoDeLeite nivel={progresso} />
			</div>

			<div className="flex flex-col gap-3 border-t border-line pt-5">
				<div className="flex items-baseline justify-between gap-3">
					<p className="text-apoio font-semibold text-ink">
						Próxima meta: {formatarLitros(meta)} L
					</p>
					<p className="text-rotulo tabular-nums text-ink-3">
						{Math.round(progresso * 100)}%
					</p>
				</div>
				<div className="h-2 overflow-hidden rounded-full bg-surface-3">
					<div
						className="h-full rounded-full bg-blue-bright motion-safe:preenche-barra"
						style={{ width: `${Math.max(progresso * 100, 2)}%` }}
					/>
				</div>
				<p className="text-apoio leading-snug text-ink-2">
					Faltam{" "}
					<strong className="font-semibold text-blue-deep">
						{formatarFalta(falta)}
					</strong>{" "}
					para alimentar mais {bebesNaMeta}{" "}
					{bebesNaMeta === 1 ? "bebê" : "bebês"} por um dia.
				</p>
				<p className="text-rotulo text-ink-3">
					Estimativa da rBLH: cerca de {BABY_ML_PER_DAY} ml por bebê a cada dia.
				</p>
			</div>
		</section>
	);
}
