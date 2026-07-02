import type { AxiosInstance } from "axios";
import type { IAuth, IAuthRequest, IAuthResponse } from "./types/i-auth";

export class Auth implements IAuth {
	constructor(private readonly httpClient: AxiosInstance) {}

	async login({ email, password }: IAuthRequest): Promise<IAuthResponse> {
		const { data } = await this.httpClient.post("/public/auth/login", {
			email,
			password,
		});

		return data;
	}
}
