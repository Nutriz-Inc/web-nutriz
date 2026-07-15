import { isValidCpf, isValidDateBr, onlyDigits } from "@/lib/masks";
import type { RegisterFormData, RegisterFormErrors } from "./types";

const EMAIL_REGEX = /\S+@\S+\.\S+/;

export function validatePersonalData(
	form: RegisterFormData,
): RegisterFormErrors {
	const errors: RegisterFormErrors = {};

	if (!form.name.trim()) {
		errors.name = "Nome é obrigatório.";
	}

	if (!form.cpf.trim()) {
		errors.cpf = "CPF é obrigatório.";
	} else if (onlyDigits(form.cpf).length !== 11 || !isValidCpf(form.cpf)) {
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
