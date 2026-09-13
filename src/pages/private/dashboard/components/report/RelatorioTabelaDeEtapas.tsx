import type { ActiveDonationsByStep } from "@/services/types/i-dashboard";
import { STEP_DISPLAY } from "@/utils/status";
import { toPercent } from "../../utils";

type RelatorioTabelaDeEtapasProps = {
	etapas: ActiveDonationsByStep[];
	total: number;
	gargalo?: ActiveDonationsByStep;
};

export function RelatorioTabelaDeEtapas({
	etapas,
	total,
	gargalo,
}: RelatorioTabelaDeEtapasProps) {
	return (
		<table className="relatorio-tabela">
			<thead>
				<tr>
					<th scope="col">Etapa</th>
					<th scope="col">Situação</th>
					<th scope="col">Doações</th>
					<th scope="col">%</th>
				</tr>
			</thead>
			<tbody>
				{etapas.map((item) => {
					const ehGargalo = item.step === gargalo?.step;

					return (
						<tr key={item.step}>
							<td>
								<span className="relatorio-tabela-marca">
									<i data-destaque={ehGargalo ? "sim" : "nao"} />
									{STEP_DISPLAY[item.step]?.label ?? item.step}
								</span>
							</td>
							<td>{ehGargalo ? "Maior fila" : "Em fluxo"}</td>
							<td>{item.count}</td>
							<td>{toPercent(item.percentage)}%</td>
						</tr>
					);
				})}
				<tr>
					<td>
						<span className="relatorio-tabela-marca">Total em andamento</span>
					</td>
					<td>—</td>
					<td>{total}</td>
					<td>100%</td>
				</tr>
			</tbody>
		</table>
	);
}
