import type { FilterChipOption } from "@/components/full/FilterChips";
import { EnumJobStatus } from "@/services/types/i-job";

export type StatusFilter = "all" | EnumJobStatus;

export const STATUS_FILTER_OPTIONS: FilterChipOption<StatusFilter>[] = [
	{ key: "all", label: "Todos" },
	{ key: EnumJobStatus.Pending, label: "Em Andamento" },
	{ key: EnumJobStatus.Done, label: "Concluído" },
	{ key: EnumJobStatus.Failed, label: "Com Erro" },
];
