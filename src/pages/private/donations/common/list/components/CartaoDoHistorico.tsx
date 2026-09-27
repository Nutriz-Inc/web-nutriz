import { ChevronRight, Lock, Repeat } from "lucide-react";
import type { CSSProperties } from "react";
import { StatusBadge } from "@/components/full/StatusBadge";
import { cn } from "@/lib/utils";
import { donationToken, STEP_DISPLAY } from "@/utils/status";
import { getStepDefinitions } from "../../info/constants";
import type { DoacaoDaLista } from "../types";

type CartaoDoHistoricoProps = {
	doacao: DoacaoDaLista;
	indice: number;
	onAbrir?: () => void;
};

const dia = new Intl.DateTimeFormat("pt-BR", { day: "2-digit" });
const mesAno = new Intl.DateTimeFormat("pt-BR", {
	month: "short",
	year: "numeric",
});

function resumoDaTrilha(doacao: DoacaoDaLista) {
	const rotulo = doacao.etapaAtual
		? STEP_DISPLAY[doacao.etapaAtual].label
		: undefined;
	if (doacao.comErro) {
		return rotulo ? `Parou em ${rotulo}` : "Interrompida";
	}
	if (doacao.ativa) {
		return rotulo ? `Em ${rotulo}` : "Aguardando a primeira etapa";
	}
	return "Todas as etapas concluídas";
}

export function CartaoDoHistorico({
	doacao,
	indice,
	onAbrir,
}: CartaoDoHistoricoProps) {
	const clicavel = Boolean(onAbrir);
	const data = new Date(doacao.criadaEm);
	const etapas = getStepDefinitions(doacao.recorrente);
	const posicao = etapas.findIndex((etapa) => etapa.name === doacao.etapaAtual);
	const concluida = !doacao.ativa && !doacao.comErro;

	const corDaFaixa = doacao.comErro
		? "bg-danger"
		: doacao.ativa
			? "bg-blue-bright"
			: "bg-success";

	return (
		<li className="entra" style={{ "--i": indice } as CSSProperties}>
			<button
				type="button"
				onClick={onAbrir}
				disabled={!clicavel}
				className={cn(
					"group relative flex h-full w-full flex-col gap-5 overflow-hidden rounded-card border border-line bg-surface p-5 text-left shadow-soft sm:p-6",
					clicavel &&
						"transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 active:scale-[0.99]",
				)}
			>
				<span
					aria-hidden="true"
					className={cn("absolute inset-x-0 top-0 h-1", corDaFaixa)}
				/>

				<div className="flex items-start justify-between gap-3">
					<p className="flex items-baseline gap-2">
						<span className="font-display text-pagina font-bold leading-none tracking-tight tabular-nums text-blue-deep">
							{dia.format(data)}
						</span>
						<span className="text-apoio font-semibold text-ink-2">
							{mesAno.format(data).replace(".", "").replace(" de ", " ")}
						</span>
					</p>
					<StatusBadge
						token={donationToken(doacao.ativa, doacao.comErro)}
						gender="f"
						size="md"
					/>
				</div>

				<div className="flex flex-col gap-2.5">
					<ol
						aria-hidden="true"
						className="grid gap-1.5"
						style={{
							gridTemplateColumns: `repeat(${etapas.length}, minmax(0, 1fr))`,
						}}
					>
						{etapas.map((etapa, ordem) => {
							const feita = concluida || ordem < posicao;
							const parada = doacao.comErro && ordem === posicao;
							const atual = doacao.ativa && ordem === posicao;

							return (
								<li
									key={etapa.name}
									className={cn(
										"h-1.5 rounded-full",
										parada
											? "bg-danger"
											: feita
												? "bg-success"
												: atual
													? "bg-blue-bright"
													: "bg-surface-3",
									)}
								/>
							);
						})}
					</ol>
					<p className="text-rotulo text-ink-2">{resumoDaTrilha(doacao)}</p>
				</div>

				<div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
					<span className="flex min-w-0 items-center gap-2.5">
						<span className="text-apoio font-semibold text-ink">
							Doação #{doacao.numero}
						</span>
						{doacao.recorrente ? (
							<span className="inline-flex items-center gap-1 rounded-full bg-teal-tint px-2 py-0.5 text-rotulo font-semibold text-teal">
								<Repeat
									className="size-3"
									strokeWidth={2.2}
									aria-hidden="true"
								/>
								Recorrente
							</span>
						) : null}
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
				</div>
			</button>
		</li>
	);
}
