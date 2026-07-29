import type { FilterChipOption } from "@/components/full/FilterChips";
import { EnumUserType } from "@/services/types/i-user";

export type ProfileFilter = "all" | EnumUserType;

export const PROFILE_FILTER_OPTIONS: FilterChipOption<ProfileFilter>[] = [
	{ key: "all", label: "Todos" },
	{ key: EnumUserType.Admin, label: "Administrador" },
	{ key: EnumUserType.Nurse, label: "Enfermeiro" },
	{ key: EnumUserType.Common, label: "Doadora" },
];
