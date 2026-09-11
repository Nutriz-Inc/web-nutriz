import { Search, X } from "lucide-react";
import type { FormEvent } from "react";
import { FilterChips } from "@/components/full/FilterChips";
import { SearchBar } from "@/components/full/SearchBar";
import { Button } from "@/components/ui/button";
import { DateFilter } from "../../../list/components/DateFilter";
import { STATUS_FILTER_OPTIONS, type StatusFilter } from "../constants";

type AppointmentFiltersProps = {
	donorName: string;
	onDonorNameChange: (value: string) => void;
	nurseName: string;
	onNurseNameChange: (value: string) => void;
	dateFilter: string;
	onDateFilterChange: (value: string) => void;
	status: StatusFilter;
	onStatusChange: (value: StatusFilter) => void;
	onApply: () => void;
	onClear: () => void;
};

export function AppointmentFilters({
	donorName,
	onDonorNameChange,
	nurseName,
	onNurseNameChange,
	dateFilter,
	onDateFilterChange,
	status,
	onStatusChange,
	onApply,
	onClear,
}: AppointmentFiltersProps) {
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onApply();
	}

	return (
		<div className="flex flex-col gap-[18px] lg:gap-5">
			<div className="sem-barra flex items-center gap-2.5 overflow-x-auto">
				<FilterChips
					options={STATUS_FILTER_OPTIONS}
					value={status}
					onChange={onStatusChange}
				/>
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
				<div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
					<div className="lg:flex-1">
						<SearchBar
							value={donorName}
							onChange={onDonorNameChange}
							placeholder="Buscar por doadora..."
						/>
					</div>
					<div className="lg:flex-1">
						<SearchBar
							value={nurseName}
							onChange={onNurseNameChange}
							placeholder="Buscar por responsável..."
						/>
					</div>
					<div className="grid grid-cols-2 gap-2.5 lg:flex lg:shrink-0 lg:gap-2.5">
						<Button
							variant="primary"
							size="pill"
							type="submit"
							className="shrink-0"
						>
							<Search className="size-4" />
							Aplicar filtro
						</Button>
						<Button
							variant="neutral"
							size="pill"
							type="button"
							onClick={onClear}
							className="shrink-0"
						>
							<X className="size-4" />
							Limpar filtro
						</Button>
					</div>
				</div>

				<DateFilter value={dateFilter} onChange={onDateFilterChange} />
			</form>
		</div>
	);
}
