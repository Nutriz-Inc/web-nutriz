import { EnumUserType, type ICreateUserRequest } from "@/services/types/i-user";
import { dateBrToIso, onlyDigits, phoneToE164 } from "@/utils/formatter";
import { TERMS_VERSION } from "./components/constants";
import type { BabyFormData, RegisterFormData } from "./types";

export function makeEmptyBaby(): BabyFormData {
	return { id: crypto.randomUUID(), name: "", birthDate: "" };
}

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

export function buildCreateUserRequest(
	form: RegisterFormData,
	ipAddress: string,
): ICreateUserRequest {
	return {
		type: EnumUserType.Common,
		name: form.name.trim(),
		cpf: onlyDigits(form.cpf),
		email: form.email.trim(),
		password: form.password,
		phone_number: phoneToE164(form.phone),
		birth_date: dateBrToIso(form.birthDate),
		address: {
			zip_code: onlyDigits(form.cep),
			number: form.number.trim() || undefined,
			complement: form.complement.trim() || undefined,
		},
		user_baby:
			form.hasBaby && form.babies[0]
				? {
						name: form.babies[0].name.trim() || undefined,
						birth_date: dateBrToIso(form.babies[0].birthDate),
					}
				: undefined,
		consent_log: {
			terms_version: TERMS_VERSION,
			ip_address: ipAddress,
			user_agent: navigator.userAgent,
		},
	};
}
