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
