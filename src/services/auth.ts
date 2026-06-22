import type { AxiosInstance } from "axios";
import type { IAuthRequest, IAuthResponse } from "./types/i-auth";

export class Auth {
	constructor(private readonly httpClient: AxiosInstance) {}

	async login({ document, password }: IAuthRequest): Promise<IAuthResponse> {
		const { data } = await this.httpClient.post("/public/auth/login", {
			document,
			password,
		});

		return data;
	}
}