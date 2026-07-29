import type { AxiosInstance } from "axios";
import type { IDashboard, IGetAdmDashboardRequest, IGetAdmDashboardResponse } from "./types/i-dashboard";

export class Dashboard implements IDashboard {
    constructor(private readonly httpClient: AxiosInstance) {}

    async getAdmDashboard(data: IGetAdmDashboardRequest): Promise<IGetAdmDashboardResponse> {
        const { data: response } = await this.httpClient.get("/internal/dashboard", {
            params: data,
        });

        return response;
    }
}
