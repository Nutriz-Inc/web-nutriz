import axios from "axios";
import { Auth } from "./auth";
import { env } from "../config/env";
import { Donation } from "./donation";
import { Job } from "./job";

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
		if (error.response?.status === 403) {
			localStorage.clear();
			window.location.reload();
		}

		return Promise.reject(error);
	},
);

export default {
	auth: new Auth(httpClient),
	donation: new Donation(httpClient),
	job: new Job(httpClient),
};