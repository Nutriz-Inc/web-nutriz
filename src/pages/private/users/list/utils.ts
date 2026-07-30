import type { ICreateUserRequest } from "@/services/types/i-user";
import { onlyDigits, phoneToE164 } from "@/utils/formatter";
import type { CreateUserFormData } from "./validation";

export function buildCreateUserRequest(
	form: CreateUserFormData,
): ICreateUserRequest {
	return {
		type: form.type,
		name: form.name.trim(),
		cpf: onlyDigits(form.cpf),
		email: form.email.trim(),
		password: form.password,
		phone_number: phoneToE164(form.phone_number),
		identifier: form.identifier.trim() || undefined,
	};
}
