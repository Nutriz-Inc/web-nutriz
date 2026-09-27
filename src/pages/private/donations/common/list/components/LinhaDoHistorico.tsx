import { ChevronRight, Lock, Repeat } from "lucide-react";
import type { CSSProperties } from "react";
import { StatusBadge } from "@/components/full/StatusBadge";
import { cn } from "@/lib/utils";
import { formatCreatedAt } from "@/utils/formatter";
import { donationToken, STEP_DISPLAY } from "@/utils/status";
import type { DoacaoDaLista } from "../types";

type LinhaDoHistoricoProps = {
	doacao: DoacaoDaLista;
	indice: number;
	ultima: boolean;
	onAbrir?: () => void;
};

export function LinhaDoHistorico({
	doacao,
	indice,
	ultima,
	onAbrir,
}: LinhaDoHistoricoProps) {
	const clicavel = Boolean(onAbrir);
	const corDoPonto = doacao.comErro
		? "bg-danger"
		: doacao.ativa
			? "bg-blue-bright"
			: "bg-success";

	return (
		<li
			className="entra group/linha"
			style={{ "--i": indice } as CSSProperties}
		>
			<button
				type="button"
				onClick={onAbrir}
				disabled={!clicavel}
				className={cn(
					"group grid w-full grid-cols-[1.25rem_minmax(0,1fr)] items-stretch gap-x-4 px-5 text-left sm:px-6",
					clicavel &&
						"transition-colors duration-150 hover:bg-surface-2 focus-visible:bg-surface-2",
				)}
			>
				<span aria-hidden="true" className="relative flex justify-center">
					<span
						className={cn(
							"absolute w-px bg-line-strong",
							indice === 0 ? "top-1/2" : "top-0",
							ultima ? "bottom-1/2" : "bottom-0",
						)}
					/>
					<span
						className={cn(
							"relative my-auto size-3 rounded-full ring-4 ring-surface transition-transform duration-200 group-hover:scale-125",
							corDoPonto,
						)}
					/>
				</span>

				<span className="flex min-w-0 items-center gap-3 border-b border-line py-4 group-last/linha:border-b-0">
					<span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
						<span className="flex min-w-0 flex-col gap-0.5">
							<span className="truncate text-corpo font-semibold text-ink">
								Doação #{doacao.numero}
							</span>
							<span className="truncate text-rotulo text-ink-3">
								{formatCreatedAt(doacao.criadaEm)}
							</span>
						</span>
						<span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-rotulo text-ink-2 sm:ml-auto">
							{doacao.etapaAtual && doacao.ativa ? (
								<span>Em {STEP_DISPLAY[doacao.etapaAtual].label}</span>
							) : null}
							{doacao.recorrente ? (
								<span className="inline-flex items-center gap-1 font-semibold text-teal">
									<Repeat
										className="size-3"
										strokeWidth={2.2}
										aria-hidden="true"
									/>
									Recorrente
								</span>
							) : null}
						</span>
					</span>
					<span className="flex shrink-0 items-center gap-2">
						<StatusBadge
							token={donationToken(doacao.ativa, doacao.comErro)}
							gender="f"
							size="md"
						/>
						{clicavel ? (
							<ChevronRight
								className="size-4 shrink-0 text-ink-3"
								aria-hidden="true"
							/>
						) : (
							<Lock
								className="size-3.5 shrink-0 text-ink-3"
								aria-label="Sem etapa para abrir"
							/>
						)}
					</span>
				</span>
			</button>
		</li>
	);
}
