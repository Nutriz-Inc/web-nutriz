import services from "@/services";
import type { IAuthRequest, IAuthResponse } from "@/services/types/i-auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Dispatch, SetStateAction } from "react";
import type { FormErrors } from "..";

export type UseLoginProps = {
    updateAuth: (data: IAuthResponse) => void;
    setErrors: Dispatch<SetStateAction<FormErrors>>;
    onSuccess: () => void;
}

export function useLogin({ updateAuth, setErrors, onSuccess }: UseLoginProps) {
    const loginMutation = useMutation({
		mutationFn: (data: IAuthRequest) => services.auth.login(data),
		onSuccess: (data) => {
			updateAuth(data);
			onSuccess();
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				setErrors({ general: "E-mail ou senha incorretos." });
			} else {
				setErrors({ general: "Erro ao fazer login. Tente novamente." });
			}
		},
	});

    return {
        loginMutation
    }
}