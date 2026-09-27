import { Droplet } from "lucide-react";
import { CountUp } from "@/components/full/CountUp";
import { BABY_ML_PER_DAY } from "@/utils/constants";

const METAS_EM_ML = [1000, 2000, 5000, 10000, 20000, 50000, 100000];

type ImpactoNaJornadaProps = {
	mlDoados: number;
};

function litros(ml: number) {
	return (ml / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

export function ImpactoNaJornada({ mlDoados }: ImpactoNaJornadaProps) {
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
		<div className="flex flex-col gap-3 rounded-2xl bg-blue-tint p-4">
			<div className="flex items-center gap-3">
				<span
					aria-hidden="true"
					className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-blue-bright"
				>
					<Droplet className="size-4" />
				</span>
				{mlDoados > 0 ? (
					<p className="text-apoio leading-snug text-ink-2">
						Seu leite já alimentou{" "}
						<strong className="font-display text-destaque font-bold tabular-nums text-blue-deep">
							<CountUp value={bebes} /> {bebes === 1 ? "bebê" : "bebês"}
						</strong>{" "}
						por um dia, com {litros(mlDoados)} L doados.
					</p>
				) : (
					<p className="text-apoio leading-snug text-ink-2">
						Com 1 L de leite, cerca de{" "}
						<strong className="font-semibold text-blue-deep">
							{Math.floor(1000 / BABY_ML_PER_DAY)} bebês
						</strong>{" "}
						prematuros se alimentam por um dia.
					</p>
				)}
			</div>
			<div
				className="h-1.5 overflow-hidden rounded-full bg-surface"
				role="progressbar"
				aria-label={`Progresso até a meta de ${litros(meta)} L`}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Math.round(progresso * 100)}
			>
				<div
					className="h-full rounded-full bg-blue-bright motion-safe:preenche-barra"
					style={{ width: `${Math.max(progresso * 100, 3)}%` }}
				/>
			</div>
			<p className="text-rotulo leading-snug text-ink-2">
				Faltam{" "}
				<span className="font-semibold text-blue-deep">
					{falta >= 1000 ? `${litros(falta)} L` : `${Math.ceil(falta)} ml`}
				</span>{" "}
				para a meta de {litros(meta)} L, o suficiente para mais {bebesNaMeta}{" "}
				{bebesNaMeta === 1 ? "bebê" : "bebês"}.
			</p>
		</div>
	);
}
