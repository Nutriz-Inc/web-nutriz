import { onlyDigits } from "@/utils/formatter";
import { cpf } from 'cpf-cnpj-validator'

export type BabyFormData = {
	id: string;
	name: string;
	birthDate: string;
};

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


const EMAIL_REGEX = /\S+@\S+\.\S+/;

function isValidDateBr(value: string): boolean {
	const digits = onlyDigits(value);
	if (digits.length !== 8) return false;
	const day = Number(digits.slice(0, 2));
	const month = Number(digits.slice(2, 4));
	const year = Number(digits.slice(4, 8));
	if (year < 1900 || month < 1 || month > 12) return false;
	const date = new Date(year, month - 1, day);
	return (
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day
	);
}

export function validatePersonalData(
	form: RegisterFormData,
): RegisterFormErrors {
	const errors: RegisterFormErrors = {};

	if (!form.name.trim()) {
		errors.name = "Nome é obrigatório.";
	}

	if (!form.cpf.trim()) {
		errors.cpf = "CPF é obrigatório.";
	} else if (onlyDigits(form.cpf).length !== 11 || !cpf.isValid(form.cpf)) {
		errors.cpf = "Informe um CPF válido.";
	}

	if (!form.birthDate.trim()) {
		errors.birthDate = "Data de nascimento é obrigatória.";
	} else if (!isValidDateBr(form.birthDate)) {
		errors.birthDate = "Informe uma data válida (DD/MM/AAAA).";
	}

	if (!form.phone.trim()) {
		errors.phone = "Telefone é obrigatório.";
	} else if (onlyDigits(form.phone).length < 10) {
		errors.phone = "Informe um telefone válido com DDD.";
	}

	if (!form.email.trim()) {
		errors.email = "E-mail é obrigatório.";
	} else if (!EMAIL_REGEX.test(form.email)) {
		errors.email = "Informe um e-mail válido.";
	}

	return errors;
}

export function validateAddress(form: RegisterFormData): RegisterFormErrors {
	const errors: RegisterFormErrors = {};

	if (!form.cep.trim()) {
		errors.cep = "CEP é obrigatório.";
	} else if (onlyDigits(form.cep).length !== 8) {
		errors.cep = "Informe um CEP válido.";
	}

	if (!form.number.trim()) {
		errors.number = "Número é obrigatório.";
	}

	return errors;
}

export function validatePassword(form: RegisterFormData): RegisterFormErrors {
	const errors: RegisterFormErrors = {};

	if (!form.password) {
		errors.password = "Senha é obrigatória.";
	} else if (form.password.length < 8) {
		errors.password = "A senha deve ter no mínimo 8 caracteres.";
	}

	if (!form.confirmPassword) {
		errors.confirmPassword = "Confirme a sua senha.";
	} else if (form.password !== form.confirmPassword) {
		errors.confirmPassword = "As senhas não coincidem.";
	}

	return errors;
}

export function validateBabyConsent(
	form: RegisterFormData,
): RegisterFormErrors {
	const errors: RegisterFormErrors = {};

	if (form.hasBaby) {
		form.babies.forEach((baby, index) => {
			if (!baby.birthDate.trim()) {
				errors[`baby-${index}-birthDate`] =
					"Data de nascimento do bebê é obrigatória.";
			} else if (!isValidDateBr(baby.birthDate)) {
				errors[`baby-${index}-birthDate`] =
					"Informe uma data válida (DD/MM/AAAA).";
			}
		});
	}

	if (!form.acceptedTerms) {
		errors.acceptedTerms =
			"Você precisa aceitar os termos para criar a sua conta.";
	}

	return errors;
}

export const STEP_VALIDATORS = [
	validatePersonalData,
	validateAddress,
	validatePassword,
	validateBabyConsent,
];
