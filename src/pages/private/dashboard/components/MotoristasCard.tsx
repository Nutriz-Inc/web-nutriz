import { Truck } from "lucide-react";
import type { FiltroDeIndicadores } from "@/services/types/i-analytics";
import { useIndicador } from "../hooks/use-indicadores";
import { formatOptionalDecimal } from "../utils";
import { IndicadorIndisponivel } from "./IndicadorIndisponivel";
import { PainelCard } from "./PainelCard";

const CELULA = "px-1 py-2.5 text-right tabular-nums";

export function MotoristasCard({ filtro }: { filtro: FiltroDeIndicadores }) {
	const consulta = useIndicador("desempenho_motoristas", filtro);
	const motoristas = (consulta.data?.motoristas ?? []).filter(
		(motorista) => motorista.rotas > 0,
	);

	return (
		<PainelCard
			icon={<Truck className="size-[15px]" strokeWidth={1.6} />}
			title="Motoristas"
			subtitle="Rotas, quilômetros e respeito ao limite de 6 horas"
		>
			{!consulta.data ? (
				<IndicadorIndisponivel
					carregando={consulta.isLoading}
					onTentarDeNovo={() => consulta.refetch()}
				/>
			) : motoristas.length === 0 ? (
				<p className="py-8 text-center text-[13px] text-ink-3">
					Nenhuma rota no período.
				</p>
			) : (
				<div className="-mx-1 overflow-x-auto">
					<table className="w-full min-w-[420px] text-left text-[13px]">
						<thead>
							<tr className="text-[11px] text-ink-2">
								<th scope="col" className="px-1 pb-2 font-medium">
									Motorista
								</th>
								<th scope="col" className="px-1 pb-2 text-right font-medium">
									Rotas
								</th>
								<th scope="col" className="px-1 pb-2 text-right font-medium">
									Km
								</th>
								<th scope="col" className="px-1 pb-2 text-right font-medium">
									No limite
								</th>
								<th scope="col" className="px-1 pb-2 text-right font-medium">
									Imprevistos
								</th>
							</tr>
						</thead>
						<tbody>
							{motoristas.map((motorista) => (
								<tr key={motorista.motorista} className="border-t border-line">
									<td className="px-1 py-2.5 font-semibold text-ink">
										{motorista.motorista}
									</td>
									<td className={CELULA}>{motorista.rotas}</td>
									<td className={CELULA}>
										{formatOptionalDecimal(motorista.km_rodados, "", 0)}
									</td>
									<td
										className={
											(motorista.conformidade_6h_pct ?? 100) < 100
												? `${CELULA} font-semibold text-orange`
												: CELULA
										}
									>
										{formatOptionalDecimal(
											motorista.conformidade_6h_pct,
											"%",
											0,
										)}
									</td>
									<td className={CELULA}>{motorista.paradas_com_imprevisto}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</PainelCard>
	);
}
