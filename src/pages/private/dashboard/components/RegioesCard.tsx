import { MapPin } from "lucide-react";
import { useState } from "react";
import { Segmented } from "@/components/ui/segmented";
import type { FiltroDeIndicadores } from "@/services/types/i-analytics";
import { useIndicador } from "../hooks/use-indicadores";
import { formatDecimal } from "../utils";
import { IndicadorIndisponivel } from "./IndicadorIndisponivel";
import { PainelCard } from "./PainelCard";

const REGIOES_VISIVEIS = 6;

type Agrupamento = "cidade" | "bairro";

export function RegioesCard({ filtro }: { filtro: FiltroDeIndicadores }) {
	const [agrupamento, setAgrupamento] = useState<Agrupamento>("cidade");
	const consulta = useIndicador("regioes", {
		...filtro,
		agrupar_por: agrupamento,
	});
	const regioes = (consulta.data?.regioes ?? []).slice(0, REGIOES_VISIVEIS);
	const maior = Math.max(...regioes.map((regiao) => regiao.litros), 0.001);

	return (
		<PainelCard
			icon={<MapPin className="size-[15px]" strokeWidth={1.6} />}
			title="Onde o leite nasce"
			subtitle="Litros coletados pelo endereço da doadora"
			acao={
				<Segmented<Agrupamento>
					value={agrupamento}
					onChange={setAgrupamento}
					aria-label="Agrupar por"
					options={[
						{ key: "cidade", label: "Cidade" },
						{ key: "bairro", label: "Bairro" },
					]}
				/>
			}
		>
			{!consulta.data ? (
				<IndicadorIndisponivel
					carregando={consulta.isLoading}
					onTentarDeNovo={() => consulta.refetch()}
				/>
			) : regioes.length === 0 ? (
				<p className="py-8 text-center text-apoio text-ink-3">
					Nenhuma doação no período.
				</p>
			) : (
				<ul className="flex flex-col gap-3">
					{regioes.map((regiao) => (
						<li key={regiao.regiao} className="flex flex-col gap-1.5">
							<div className="flex items-baseline justify-between gap-3 text-apoio">
								<span className="truncate font-semibold text-ink">
									{regiao.regiao}
								</span>
								<span className="shrink-0 tabular-nums text-ink-2">
									{formatDecimal(regiao.litros)} L · {regiao.doadoras} doadoras
								</span>
							</div>
							<div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
								<div
									className="h-full rounded-full bg-blue-deep"
									style={{ width: `${(regiao.litros / maior) * 100}%` }}
								/>
							</div>
						</li>
					))}
				</ul>
			)}
		</PainelCard>
	);
}
