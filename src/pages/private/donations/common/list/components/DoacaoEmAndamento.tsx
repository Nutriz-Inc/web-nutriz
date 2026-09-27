import { ArrowRight, Calendar, HeartHandshake } from "lucide-react";
import { OndaDeLeite } from "@/components/full/OndaDeLeite";
import { cn } from "@/lib/utils";
import { formatCreatedAt } from "@/utils/formatter";
import { getStepDefinitions } from "../../info/constants";
import type { DoacaoDaLista } from "../types";
import { TrilhaDeEtapas } from "./TrilhaDeEtapas";

type DoacaoEmAndamentoProps = {
	doacao: DoacaoDaLista;
	onAbrir?: () => void;
};

export function DoacaoEmAndamento({ doacao, onAbrir }: DoacaoEmAndamentoProps) {
	const etapas = getStepDefinitions(doacao.recorrente);
	const definicao = etapas.find((etapa) => etapa.name === doacao.etapaAtual);
	const Icone = definicao?.icon ?? HeartHandshake;
	const clicavel = Boolean(onAbrir);

	return (
		<button
			type="button"
			onClick={onAbrir}
			disabled={!clicavel}
			className={cn(
				"group relative isolate flex w-full flex-col justify-between gap-7 overflow-hidden rounded-card gradient-blue p-6 text-left text-white shadow-lift sm:p-8 lg:gap-9 lg:p-10",
				clicavel &&
					"transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99]",
			)}
		>
			<Icone
				aria-hidden="true"
				strokeWidth={1.1}
				className="pointer-events-none absolute -right-6 -bottom-10 -z-10 size-56 text-white/[0.07] transition-transform duration-500 ease-out group-hover:-rotate-6 lg:size-72"
			/>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute -top-24 -left-16 -z-10 size-72 rounded-full bg-white/[0.06] blur-2xl"
			/>
			<OndaDeLeite className="h-28 opacity-20 lg:h-36" />

			<div className="flex flex-wrap items-center justify-between gap-3">
				<span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-rotulo font-semibold backdrop-blur-sm">
					<span className="relative flex size-2" aria-hidden="true">
						<span
							className={cn(
								"absolute inline-flex size-full rounded-full opacity-60 motion-safe:animate-ping",
								doacao.comErro ? "bg-amber" : "bg-mint",
							)}
						/>
						<span
							className={cn(
								"relative inline-flex size-2 rounded-full",
								doacao.comErro ? "bg-amber" : "bg-mint",
							)}
						/>
					</span>
					{doacao.comErro ? "Precisa de atenção" : "Em andamento"}
				</span>
				<span className="text-apoio font-medium text-white/75">
					Doação #{doacao.numero}
					{doacao.recorrente ? " · recorrente" : ""}
				</span>
			</div>

			<div className="flex max-w-[34rem] flex-col gap-2">
				<p className="text-rotulo font-semibold uppercase tracking-[0.12em] text-white/65">
					{definicao
						? `Etapa ${definicao.order} de ${etapas.length}`
						: "Aguardando a primeira etapa"}
				</p>
				<p className="font-display text-titulo font-bold leading-tight tracking-tight lg:text-pagina">
					{doacao.etapaAtual ?? "Sua doação foi criada"}
				</p>
				{definicao ? (
					<p className="text-apoio text-white/75 lg:text-corpo">
						{definicao.description}
					</p>
				) : null}
			</div>

			<TrilhaDeEtapas etapas={etapas} atual={doacao.etapaAtual} />

			<div className="flex flex-wrap items-center justify-between gap-3">
				<span className="inline-flex items-center gap-2 text-apoio text-white/75">
					<Calendar className="size-4 shrink-0" aria-hidden="true" />
					Criada em {formatCreatedAt(doacao.criadaEm)}
				</span>
				{clicavel ? (
					<span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-apoio font-semibold text-blue-deep-fill shadow-soft">
						Acompanhar etapa
						<ArrowRight
							className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
							aria-hidden="true"
						/>
					</span>
				) : null}
			</div>
		</button>
	);
}
