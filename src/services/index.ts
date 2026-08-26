import axios from "axios";
import { CHAVE_ACESSIBILIDADE } from "@/utils/accessibility-storage";
import { env } from "../config/env";
import { Auth } from "./auth";
import { Dashboard } from "./dashboard";
import { Donation } from "./donation";
import { Job } from "./job";
import { User } from "./user";

export const baseURL = env?.VITE_API_URL;

const httpClient = axios.create({
	baseURL: baseURL,
});

export function setApiToken(token: string) {
	httpClient.defaults.headers.authorization = `Bearer ${token}`;
}

httpClient.interceptors.request.use((config) => {
	const token = window.localStorage.getItem("token");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

httpClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const status = error.response?.status;
		const isLoginRequest = error.config?.url?.includes("/auth/login");

		if ((status === 401 || status === 403) && !isLoginRequest) {
			/*
			 * Limpeza da sessao preservando as preferencias de acessibilidade.
			 *
			 * O `localStorage.clear()` que estava aqui levava tudo junto. Quem usa
			 * a fonte para dislexia ou o tema escuro perdia a configuracao a cada
			 * sessao expirada e tinha que reconfigurar — o que anula o recurso.
			 * Tudo que e sessao continua sendo apagado; so esta chave sobrevive.
			 */
			const acessibilidade = localStorage.getItem(CHAVE_ACESSIBILIDADE);
			localStorage.clear();
			if (acessibilidade !== null) {
				localStorage.setItem(CHAVE_ACESSIBILIDADE, acessibilidade);
			}

			window.location.reload();
		}

		return Promise.reject(error);
	},
);

export default {
	auth: new Auth(httpClient),
	donation: new Donation(httpClient),
	job: new Job(httpClient),
	user: new User(httpClient),
	dashboard: new Dashboard(httpClient),
};
