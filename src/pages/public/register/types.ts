export type BabyFormData = {
	id: string;
	name: string;
	birthDate: string;
};

export function makeEmptyBaby(): BabyFormData {
	return { id: crypto.randomUUID(), name: "", birthDate: "" };
}

export type RegisterFormData = {
	name: string;
	cpf: string;
	birthDate: string;
	phone: string;
	email: string;
	cep: string;
	number: string;
	complement: string;
	password: string;
	confirmPassword: string;
	hasBaby: boolean;
	babies: BabyFormData[];
	acceptedTerms: boolean;
};

export type RegisterFieldName = Exclude<
	keyof RegisterFormData,
	"hasBaby" | "babies" | "acceptedTerms"
>;

export type RegisterFormErrors = Record<string, string | undefined>;

export const EMPTY_REGISTER_FORM: RegisterFormData = {
	name: "",
	cpf: "",
	birthDate: "",
	phone: "",
	email: "",
	cep: "",
	number: "",
	complement: "",
	password: "",
	confirmPassword: "",
	hasBaby: false,
	babies: [makeEmptyBaby()],
	acceptedTerms: false,
};
