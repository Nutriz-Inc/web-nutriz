import type {
	IDeleteResponse,
	IPaginationRequest,
	IPaginationResponse,
} from "./i-index";

// entity
export interface Job {
	id_job: string;
	id_user: string;
	id_step: string;
	status: EnumJobStatus;
	name: string;
	description: string;
	date_set?: string;
	user_feedback?: string;
	created_at: string;
	created_by: string;
	updated_at?: string;
	updated_by?: string;
	removed_at?: string;
	removed_by?: string;
}

export enum EnumJobStatus {
	Pending = "pending",
	Done = "done",
	Failed = "failed",
}

export interface ICreateJobRequest {
	id_user: string;
	id_step: string;
	name: string;
	description: string;
	date_set?: string;
}
export type ICreateJobResponse = Job;

export type IGetJobResponse = Job;

export interface IListJobsRequest extends IPaginationRequest {
	date_set?: string;
	id_step?: string;
}
export interface IListJobsResponse extends IPaginationResponse {
	data: Job[];
}

export interface IUpdateJobRequest {
	id_user?: string;
	status?: EnumJobStatus;
	description?: string;
	date_set?: string;
	user_feedback?: string;
}

export type IUpdateJobResponse = Job;

export type IRemoveJobResponse = IDeleteResponse;

export interface IJob {
	list(data: IListJobsRequest): Promise<IListJobsResponse>;
	create(data: ICreateJobRequest): Promise<ICreateJobResponse>;
	update(id_job: string, data: IUpdateJobRequest): Promise<IUpdateJobResponse>;
	get(id_job: string): Promise<IGetJobResponse>;
	remove(id_job: string): Promise<IRemoveJobResponse>;
}
