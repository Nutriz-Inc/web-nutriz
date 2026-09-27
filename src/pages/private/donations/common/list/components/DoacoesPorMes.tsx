import { cn } from "@/lib/utils";
import { formatMonthBR } from "@/utils/formatter";
import type { DoacaoDaLista } from "../types";

const MESES = 6;

type DoacoesPorMesProps = {
	doacoes: DoacaoDaLista[];
};

function chaveDoMes(data: Date) {
	return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`;
}

export function DoacoesPorMes({ doacoes }: DoacoesPorMesProps) {
	const hoje = new Date();
	const meses = Array.from({ length: MESES }, (_, posicao) => {
		const data = new Date(
			hoje.getFullYear(),
			hoje.getMonth() - (MESES - 1 - posicao),
			1,
		);
		const chave = chaveDoMes(data);
		const total = doacoes.filter(
			(doacao) => chaveDoMes(new Date(doacao.criadaEm)) === chave,
		).length;
		return { chave, total };
	});
	const maior = Math.max(1, ...meses.map((mes) => mes.total));

	return (
		<figure className="flex flex-col gap-3">
			<figcaption className="text-rotulo text-ink-2">
				Doações abertas nos últimos 6 meses
			</figcaption>
			<ol className="grid h-24 grid-cols-6 items-end gap-2">
				{meses.map((mes, posicao) => (
					<li
						key={mes.chave}
						className="flex h-full flex-col items-center justify-end gap-1.5"
						aria-label={`${formatMonthBR(mes.chave)}: ${mes.total} ${mes.total === 1 ? "doação" : "doações"}`}
					>
						<span
							className={cn(
								"w-full max-w-7 origin-bottom rounded-md motion-safe:[animation:nz-crescer_600ms_var(--ease-out)_both]",
								mes.total > 0 ? "bg-blue-bright" : "bg-surface-3",
							)}
							style={{
								height: `${mes.total > 0 ? Math.max(18, (mes.total / maior) * 100) : 8}%`,
								animationDelay: `${posicao * 60}ms`,
							}}
						/>
						<span
							aria-hidden="true"
							className={cn(
								"text-rotulo",
								posicao === MESES - 1 ? "font-semibold text-ink" : "text-ink-3",
							)}
						>
							{formatMonthBR(mes.chave).split(" ")[0]}
						</span>
					</li>
				))}
			</ol>
		</figure>
	);
}
