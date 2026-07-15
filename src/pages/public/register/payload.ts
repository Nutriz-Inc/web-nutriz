import { dateBrToIso, onlyDigits, phoneToE164 } from "@/lib/masks";
import { EnumUserType, type ICreateUserRequest } from "@/services/types/i-user";
import { TERMS_VERSION } from "./components/constants";
import type { RegisterFormData } from "./types";

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
