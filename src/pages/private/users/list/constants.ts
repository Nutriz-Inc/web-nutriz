import type { FilterChipOption } from "@/components/full/FilterChips";
import { EnumUserType } from "@/services/types/i-user";
import type { CreateUserFormData } from "./validation";

export type ProfileFilter = "all" | EnumUserType;

export type UserSearchFieldKey = "name" | "cpf" | "internal_identifier";

export type RecurrentFilter = "all" | "recurrent" | "first";

export const USER_SEARCH_FIELDS: {
	key: UserSearchFieldKey;
	label: string;
	placeholder: string;
}[] = [
	{ key: "name", label: "Nome", placeholder: "Buscar por nome..." },
	{ key: "cpf", label: "CPF", placeholder: "Buscar por CPF..." },
	{
		key: "internal_identifier",
		label: "ID interno",
		placeholder: "Buscar por identificador interno...",
	},
];

export const PROFILE_FILTER_OPTIONS: FilterChipOption<ProfileFilter>[] = [
	{ key: "all", label: "Todos" },
	{ key: EnumUserType.Admin, label: "Administrador" },
	{ key: EnumUserType.Nurse, label: "Enfermeiro" },
	{ key: EnumUserType.Common, label: "Doadora" },
	{ key: EnumUserType.Driver, label: "Motorista" },
];

export const RECURRENT_FILTER_OPTIONS: FilterChipOption<RecurrentFilter>[] = [
	{ key: "all", label: "Todas" },
	{ key: "recurrent", label: "Recorrentes" },
	{ key: "first", label: "Não recorrentes" },
];

export const PROFILE_TYPE_OPTIONS = [
	EnumUserType.Admin,
	EnumUserType.Nurse,
	EnumUserType.Driver,
] as const;

export const EMPTY_FORM: CreateUserFormData = {
	type: EnumUserType.Admin,
	name: "",
	cpf: "",
	email: "",
	password: "",
	confirmPassword: "",
	phone_number: "",
	identifier: "",
};
