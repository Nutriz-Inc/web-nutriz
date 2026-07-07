import type { AxiosInstance } from "axios";
import type {
	ICreateDonationResponse,
	ICreateDonationStepRequest,
	ICreateDonationStepResponse,
	IDonation,
	IGetDonationResponse,
	IListDonationPointsRequest,
	IListDonationPointsResponse,
	IListDonationStepTimelinesRequest,
	IListDonationStepTimelinesResponse,
	IListDonationsRequest,
	IListDonationsResponse,
	IUpdateDonationRequest,
	IUpdateDonationResponse,
	IUpdateDonationStepRequest,
	IUpdateDonationStepResponse,
} from "./types/i-donation";

export class Donation implements IDonation {
	constructor(private readonly httpClient: AxiosInstance) {}

	async list(params: IListDonationsRequest): Promise<IListDonationsResponse> {
		const { data } = await this.httpClient.get("/internal/donation", {
			params,
		});

		return data;
	}

	async create(): Promise<ICreateDonationResponse> {
		const { data } = await this.httpClient.post("/internal/donation");

		return data;
	}

	async update(
		id_donation: string,
		body: IUpdateDonationRequest,
	): Promise<IUpdateDonationResponse> {
		const { data } = await this.httpClient.patch(
			`/internal/donation/${id_donation}`,
			body,
		);

		return data;
	}

	async get(id_donation: string): Promise<IGetDonationResponse> {
		const { data } = await this.httpClient.get(
			`/internal/donation/${id_donation}`,
		);

		return data;
	}

	async listPoints(
		params: IListDonationPointsRequest,
	): Promise<IListDonationPointsResponse> {
		const { data } = await this.httpClient.get("/public/donation/point", {
			params,
		});

		return data;
	}

	async createStep(
		body: ICreateDonationStepRequest,
	): Promise<ICreateDonationStepResponse> {
		const { data } = await this.httpClient.post(
			"/internal/donation/step",
			body,
		);

		return data;
	}

	async updateStep(
		id_donation_step: string,
		body: IUpdateDonationStepRequest,
	): Promise<IUpdateDonationStepResponse> {
		const { data } = await this.httpClient.patch(
			`/internal/donation/step/${id_donation_step}`,
			body,
		);

		return data;
	}

	async listStepTimelines(
		params: IListDonationStepTimelinesRequest,
	): Promise<IListDonationStepTimelinesResponse> {
		const { id_donation_step } = params;

		const { data } = await this.httpClient.get(
			`/internal/donation/step/${id_donation_step}/timeline`,
		);

		return data;
	}
}
