import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Dispatch, SetStateAction } from "react";
import services from "@/services";
import { FALLBACK_IP } from "../components/constants";
import { buildCreateUserRequest } from "../payload";
import type { RegisterFormData, RegisterFormErrors } from "../types";

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

function mapRegisterError(error: unknown): string {
	if (axios.isAxiosError(error) && error.response) {
		const raw = JSON.stringify(error.response.data ?? "");
		if (raw.includes("duplicate_cpf")) {
			return "Já existe uma conta com este CPF.";
		}
		if (raw.includes("duplicate_email")) {
			return "Já existe uma conta com este e-mail.";
		}
		if (raw.includes("duplicate_phone_number")) {
			return "Já existe uma conta com este telefone.";
		}
		if (raw.includes("invalid_birth_date")) {
			return "Data de nascimento inválida.";
		}
		if (raw.includes("coordinates") || raw.includes("zipcode")) {
			return "Não conseguimos localizar o endereço do seu CEP agora. Confira o CEP ou tente novamente mais tarde.";
		}
		if (error.response.status >= 500) {
			return "Erro no servidor. Tente novamente em instantes.";
		}
		return "Não foi possível criar a conta. Revise os dados e tente novamente.";
	}
	return "Erro de conexão. Verifique sua internet e tente novamente.";
}

export type UseRegisterProps = {
	setErrors: Dispatch<SetStateAction<RegisterFormErrors>>;
	onSuccess: () => void;
};

export function useRegister({ setErrors, onSuccess }: UseRegisterProps) {
	const registerMutation = useMutation({
		mutationFn: async (form: RegisterFormData) => {
			const ipAddress = await resolveClientIp();
			return services.user.create(buildCreateUserRequest(form, ipAddress));
		},
		onSuccess,
		onError: (error) => {
			setErrors({ general: mapRegisterError(error) });
		},
	});

	return { registerMutation };
}
