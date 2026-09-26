import { X } from "lucide-react";
import {
	BuscaPorCampo,
	type CampoDeBusca,
} from "@/components/full/BuscaPorCampo";
import { DateFilter } from "@/components/full/DateFilter";
import { FilterChips } from "@/components/full/FilterChips";
import { GrupoDeFiltro } from "@/components/full/GrupoDeFiltro";
import { PainelDeFiltros } from "@/components/full/PainelDeFiltros";
import { Button } from "@/components/ui/button";
import { STATUS_FILTER_OPTIONS, type StatusFilter } from "../constants";

export type CampoDoAgendamento = "doadora" | "enfermagem";

const CAMPOS_DO_AGENDAMENTO: CampoDeBusca<CampoDoAgendamento>[] = [
	{
		chave: "doadora",
		rotulo: "Doadora",
		placeholder: "Buscar pelo nome da doadora",
	},
	{
		chave: "enfermagem",
		rotulo: "Enfermagem",
		placeholder: "Buscar pela enfermagem responsável",
	},
];

type AppointmentFiltersProps = {
	campo: CampoDoAgendamento;
	onCampoChange: (campo: CampoDoAgendamento) => void;
	termo: string;
	onTermoChange: (valor: string) => void;
	dateFilter: string;
	onDateFilterChange: (value: string) => void;
	status: StatusFilter;
	onStatusChange: (value: StatusFilter) => void;
	temFiltro: boolean;
	onClear: () => void;
};

export function AppointmentFilters({
	campo,
	onCampoChange,
	termo,
	onTermoChange,
	dateFilter,
	onDateFilterChange,
	status,
	onStatusChange,
	temFiltro,
	onClear,
}: AppointmentFiltersProps) {
	return (
		<div className="flex flex-col gap-4 lg:gap-5">
			<BuscaPorCampo
				campos={CAMPOS_DO_AGENDAMENTO}
				campo={campo}
				aoTrocarCampo={onCampoChange}
				valor={termo}
				aoMudar={onTermoChange}
			/>
			<PainelDeFiltros>
				<GrupoDeFiltro rotulo="Situação do agendamento">
					<FilterChips
						options={STATUS_FILTER_OPTIONS}
						value={status}
						onChange={onStatusChange}
					/>
				</GrupoDeFiltro>
				<GrupoDeFiltro rotulo="Data do agendamento">
					<DateFilter
						value={dateFilter}
						onChange={onDateFilterChange}
						semRotulo
					/>
				</GrupoDeFiltro>
				{temFiltro && (
					<Button
						variant="ghost"
						size="pill"
						type="button"
						onClick={onClear}
						className="self-start text-ink-2 lg:ml-auto lg:self-end"
					>
						<X className="size-4" />
						Limpar filtros
					</Button>
				)}
			</PainelDeFiltros>
		</div>
	);
}
