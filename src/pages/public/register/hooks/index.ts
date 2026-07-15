import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Dispatch, SetStateAction } from "react";
import { dateBrToIso } from "@/lib/masks";
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
	onSuccess: (babiesPending: boolean) => void;
};

async function createExtraBabies(form: RegisterFormData): Promise<boolean> {
	const extraBabies = form.hasBaby ? form.babies.slice(1) : [];
	if (extraBabies.length === 0) return false;

	try {
		const auth = await services.auth.login({
			email: form.email.trim(),
			password: form.password,
		});

		for (const baby of extraBabies) {
			await services.user.createBaby(
				{
					name: baby.name.trim() || undefined,
					birth_date: dateBrToIso(baby.birthDate),
				},
				{ headers: { Authorization: `Bearer ${auth.token}` } },
			);
		}

		return false;
	} catch {
		return true;
	}
}

export function useRegister({ setErrors, onSuccess }: UseRegisterProps) {
	const registerMutation = useMutation({
		mutationFn: async (form: RegisterFormData) => {
			const ipAddress = await resolveClientIp();
			const user = await services.user.create(
				buildCreateUserRequest(form, ipAddress),
			);
			const babiesPending = await createExtraBabies(form);
			return { user, babiesPending };
		},
		onSuccess: (result) => onSuccess(result.babiesPending),
		onError: (error) => {
			setErrors({ general: mapRegisterError(error) });
		},
	});

	return { registerMutation };
}
