import type { MilkCollectedByMonth } from "@/services/types/i-dashboard";
import { formatMonthBR } from "@/utils/formatter";
import { formatDecimal } from "../../utils";

type RelatorioBarrasPorMesProps = {
	porMes: MilkCollectedByMonth[];
};

export function RelatorioBarrasPorMes({ porMes }: RelatorioBarrasPorMesProps) {
	const maior = Math.max(...porMes.map((item) => item.total), 1);
	const mesVigente = porMes.at(-1)?.month;

	return (
		<>
			<div className="relatorio-meses">
				{porMes.map((item) => (
					<div key={item.month} className="relatorio-mes">
						<p className="relatorio-mes-valor">
							{formatDecimal(item.total / 1000)}
						</p>
						<span
							className="relatorio-mes-barra"
							data-destaque={item.month === mesVigente ? "sim" : "nao"}
							style={{ height: `${Math.max((item.total / maior) * 100, 3)}%` }}
						/>
						<p className="relatorio-mes-rotulo">{formatMonthBR(item.month)}</p>
					</div>
				))}
			</div>

			<p className="relatorio-legenda">
				<span>
					<i data-destaque="sim" />
					Mês vigente
				</span>
				<span>
					<i />
					Meses anteriores
				</span>
				<span>Valores em litros</span>
			</p>
		</>
	);
}
