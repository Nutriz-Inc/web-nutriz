import type { AxiosInstance } from "axios";
import type { IAuthRequest, IAuthResponse } from "./types/i-auth";

export class DonationStep implements IDonationStep {
    constructor(private readonly httpClient: AxiosInstance) {}

    async listSteps(data: IAuthRequest): Promise<IAuthResponse> {
        const { data } = await this.httpClient.post("/public/auth/login", {
            email,
            password,
        });

        return data;
    }
}