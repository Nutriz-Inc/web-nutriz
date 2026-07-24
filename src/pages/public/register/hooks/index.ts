import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Dispatch, SetStateAction } from "react";
import services from "@/services";
import { FALLBACK_IP } from "../constants";
import { buildCreateUserRequest } from "../utils";
import type { RegisterFormData, RegisterFormErrors } from "../validation";

async function resolveClientIp(): Promise<string> {
	try {
		const response = await fetch("https://api.ipify.org?format=json", {
			signal: AbortSignal.timeout(4000),
		});
		const data = await response.json();
		return typeof data?.ip === "string" ? data.ip : FALLBACK_IP;
	} catch {
		return FALLBACK_IP;
	}
}

export type RegisterErrorInfo = {
	message: string;
	alreadyRegistered: boolean;
};

function mapRegisterError(error: unknown): RegisterErrorInfo {
	if (axios.isAxiosError(error) && error.response) {
		const raw = JSON.stringify(error.response.data ?? "");
		if (raw.includes("duplicate_cpf")) {
			return {
				message: "Já existe uma conta com este CPF.",
				alreadyRegistered: true,
			};
		}
		if (raw.includes("duplicate_email")) {
			return {
				message: "Já existe uma conta com este e-mail.",
				alreadyRegistered: true,
			};
		}
		if (raw.includes("duplicate_phone_number")) {
			return {
				message: "Já existe uma conta com este telefone.",
				alreadyRegistered: true,
			};
		}
		if (raw.includes("invalid_birth_date")) {
			return {
				message: "Data de nascimento inválida.",
				alreadyRegistered: false,
			};
		}
		if (raw.includes("coordinates") || raw.includes("zipcode")) {
			return {
				message:
					"Não conseguimos localizar o endereço do seu CEP agora. Confira o CEP ou tente novamente mais tarde.",
				alreadyRegistered: false,
			};
		}
		if (error.response.status >= 500) {
			return {
				message: "Erro no servidor. Tente novamente em instantes.",
				alreadyRegistered: false,
			};
		}
		return {
			message:
				"Não foi possível criar a conta. Revise os dados e tente novamente.",
			alreadyRegistered: false,
		};
	}
	return {
		message: "Erro de conexão. Verifique sua internet e tente novamente.",
		alreadyRegistered: false,
	};
}

export type UseRegisterProps = {
	setErrors: Dispatch<SetStateAction<RegisterFormErrors>>;
	onError: (info: RegisterErrorInfo) => void;
	onSuccess: () => void;
};

export function useRegister({
	setErrors,
	onError,
	onSuccess,
}: UseRegisterProps) {
	const registerMutation = useMutation({
		mutationFn: async (form: RegisterFormData) => {
			const ipAddress = await resolveClientIp();
			return services.user.create(buildCreateUserRequest(form, ipAddress));
		},
		onSuccess,
		onError: (error: unknown) => {
			const info = mapRegisterError(error);
			setErrors({ general: info.message });
			onError(info);
		},
	});

	return { registerMutation };
}
