import { ChevronRight, Lock } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { STEP_DISPLAY } from "@/utils/status";
import type { DoacaoDaLista } from "../types";

type LinhaDoHistoricoProps = {
	doacao: DoacaoDaLista;
	indice: number;
	onAbrir?: () => void;
};

const dia = new Intl.DateTimeFormat("pt-BR", { day: "2-digit" });
const mes = new Intl.DateTimeFormat("pt-BR", { month: "short" });
const ano = new Intl.DateTimeFormat("pt-BR", { year: "numeric" });

function situacao(doacao: DoacaoDaLista) {
	if (doacao.comErro) {
		return { rotulo: "Com erro", ponto: "bg-danger" };
	}
	if (doacao.ativa) {
		return { rotulo: "Em andamento", ponto: "bg-blue-bright" };
	}
	return { rotulo: "Concluída", ponto: "bg-success" };
}

function detalhe(doacao: DoacaoDaLista) {
	const etapa = doacao.etapaAtual
		? STEP_DISPLAY[doacao.etapaAtual].label
		: undefined;
	const partes = [
		doacao.comErro
			? etapa
				? `Parou em ${etapa}`
				: "Interrompida"
			: doacao.ativa
				? etapa
					? `Em ${etapa}`
					: "Aguardando a primeira etapa"
				: "Todas as etapas concluídas",
		doacao.recorrente ? "Recorrente" : undefined,
		ano.format(new Date(doacao.criadaEm)),
	];
	return partes.filter(Boolean).join(" · ");
}

export function LinhaDoHistorico({
	doacao,
	indice,
	onAbrir,
}: LinhaDoHistoricoProps) {
	const clicavel = Boolean(onAbrir);
	const data = new Date(doacao.criadaEm);
	const estado = situacao(doacao);

	return (
		<li className="entra" style={{ "--i": indice } as CSSProperties}>
			<button
				type="button"
				onClick={onAbrir}
				disabled={!clicavel}
				className={cn(
					"group grid w-full grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 text-left sm:px-6",
					clicavel &&
						"transition-colors duration-150 hover:bg-surface-2 focus-visible:bg-surface-2",
				)}
			>
				<span className="flex flex-col items-center rounded-xl bg-surface-2 py-1.5 leading-none transition-colors duration-150 group-hover:bg-surface-3">
					<span className="font-display text-destaque font-bold tabular-nums text-ink">
						{dia.format(data)}
					</span>
					<span className="mt-1 text-rotulo uppercase text-ink-3">
						{mes.format(data).replace(".", "")}
					</span>
				</span>

				<span className="flex min-w-0 flex-col gap-1">
					<span className="truncate text-corpo font-semibold text-ink">
						Doação #{doacao.numero}
					</span>
					<span className="line-clamp-2 text-rotulo text-ink-3 sm:truncate">
						{detalhe(doacao)}
					</span>
				</span>

				<span className="flex items-center gap-3">
					<span className="inline-flex items-center gap-1.5 text-rotulo font-medium text-ink-2">
						<span
							aria-hidden="true"
							className={cn("size-1.5 rounded-full", estado.ponto)}
						/>
						{estado.rotulo}
					</span>
					{clicavel ? (
						<ChevronRight
							className="size-4 shrink-0 text-ink-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
							aria-hidden="true"
						/>
					) : (
						<Lock
							className="size-3.5 shrink-0 text-ink-3"
							aria-label="Sem etapa para abrir"
						/>
					)}
				</span>
			</button>
		</li>
	);
}
