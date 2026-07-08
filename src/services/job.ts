import type { AxiosInstance } from "axios";
import type {
	ICreateJobRequest,
	ICreateJobResponse,
	IGetJobResponse,
	IJob,
	IListJobsRequest,
	IListJobsResponse,
	IRemoveJobResponse,
	IUpdateJobRequest,
	IUpdateJobResponse,
} from "./types/i-job";

export class Job implements IJob {
	constructor(private readonly httpClient: AxiosInstance) {}

	async list(params: IListJobsRequest): Promise<IListJobsResponse> {
		const { data } = await this.httpClient.get("/internal/job", {
			params,
		});

		return data;
	}

	async create(body: ICreateJobRequest): Promise<ICreateJobResponse> {
		const { data } = await this.httpClient.post("/internal/job", body);

		return data;
	}

	async update(
		id_job: string,
		body: IUpdateJobRequest,
	): Promise<IUpdateJobResponse> {
		const { data } = await this.httpClient.put(`/internal/job/${id_job}`, body);

		return data;
	}

	async get(id_job: string): Promise<IGetJobResponse> {
		const { data } = await this.httpClient.get(`/internal/job/${id_job}`);

		return data;
	}

	async remove(id_job: string): Promise<IRemoveJobResponse> {
		const { data } = await this.httpClient.delete(`/internal/job/${id_job}`);

		return data;
	}
}
