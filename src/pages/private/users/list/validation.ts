import { cpf } from "cpf-cnpj-validator";
import type { EnumUserType } from "@/services/types/i-user";
import { onlyDigits } from "@/utils/formatter";

export type CreateUserFormData = {
	type: EnumUserType.Admin | EnumUserType.Nurse;
	name: string;
	cpf: string;
	email: string;
	password: string;
	confirmPassword: string;
	phone_number: string;
	identifier: string;
};

export type CreateUserFormErrors = Partial<
	Record<keyof CreateUserFormData, string>
>;

const EMAIL_REGEX = /\S+@\S+\.\S+/;

export function validateCreateUserForm(
	form: CreateUserFormData,
): CreateUserFormErrors {
	const errors: CreateUserFormErrors = {};

	if (!form.name.trim()) {
		errors.name = "Nome é obrigatório.";
	}

	if (!form.cpf.trim()) {
		errors.cpf = "CPF é obrigatório.";
	} else if (onlyDigits(form.cpf).length !== 11 || !cpf.isValid(form.cpf)) {
		errors.cpf = "Informe um CPF válido.";
	}

	if (!form.email.trim()) {
		errors.email = "E-mail é obrigatório.";
	} else if (!EMAIL_REGEX.test(form.email)) {
		errors.email = "Informe um e-mail válido.";
	}

	if (!form.password) {
		errors.password = "Senha é obrigatória.";
	} else if (form.password.length < 8) {
		errors.password = "A senha deve ter no mínimo 8 caracteres.";
	}

	if (!form.confirmPassword) {
		errors.confirmPassword = "Confirme a senha.";
	} else if (form.password !== form.confirmPassword) {
		errors.confirmPassword = "As senhas não coincidem.";
	}

	if (!form.phone_number.trim()) {
		errors.phone_number = "Telefone é obrigatório.";
	} else if (onlyDigits(form.phone_number).length < 10) {
		errors.phone_number = "Informe um telefone válido com DDD.";
	}

	return errors;
}
