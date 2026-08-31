import type { AxiosInstance } from "axios";
import type {
	ICreateRouteRequest,
	ICreateRouteResponse,
	ICreateRouteStopRequest,
	ICreateRouteStopResponse,
	IGetRouteResponse,
	IListRoutesRequest,
	IListRoutesResponse,
	IRemoveRouteStopResponse,
	IRoute,
	IUpdateRouteRequest,
	IUpdateRouteResponse,
	IUpdateRouteStopRequest,
	IUpdateRouteStopResponse,
} from "./types/i-route";

export class Route implements IRoute {
	constructor(private readonly httpClient: AxiosInstance) {}

	async list(params: IListRoutesRequest): Promise<IListRoutesResponse> {
		const { data } = await this.httpClient.get("/internal/route", {
			params,
		});

		return data;
	}

	async create(body: ICreateRouteRequest): Promise<ICreateRouteResponse> {
		const { data } = await this.httpClient.post("/internal/route", body);

		return data;
	}

	async get(id_route: string): Promise<IGetRouteResponse> {
		const { data } = await this.httpClient.get(`/internal/route/${id_route}`);

		return data;
	}

	async update(
		id_route: string,
		body: IUpdateRouteRequest,
	): Promise<IUpdateRouteResponse> {
		const { data } = await this.httpClient.put(
			`/internal/route/${id_route}`,
			body,
		);

		return data;
	}

	async createStop(
		id_route: string,
		body: ICreateRouteStopRequest,
	): Promise<ICreateRouteStopResponse> {
		const { data } = await this.httpClient.post(
			`/internal/route/${id_route}/stop`,
			body,
		);

		return data;
	}

	async updateStop(
		id_stop: string,
		body: IUpdateRouteStopRequest,
	): Promise<IUpdateRouteStopResponse> {
		const { data } = await this.httpClient.put(
			`/internal/route/stop/${id_stop}`,
			body,
		);

		return data;
	}

	async removeStop(id_stop: string): Promise<IRemoveRouteStopResponse> {
		const { data } = await this.httpClient.delete(
			`/internal/route/stop/${id_stop}`,
		);

		return data;
	}
}
