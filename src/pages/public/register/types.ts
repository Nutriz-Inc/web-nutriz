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
	babyName: string;
	babyBirthDate: string;
	acceptedTerms: boolean;
};

export type RegisterFieldName = keyof RegisterFormData;

export type RegisterFormErrors = Partial<
	Record<RegisterFieldName | "general", string>
>;

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
	babyName: "",
	babyBirthDate: "",
	acceptedTerms: false,
};
