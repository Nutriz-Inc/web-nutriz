import type {
	IDeleteResponse,
	IPaginationRequest,
	IPaginationResponse,
} from "./i-index";
import type { Address } from "./i-user";

export interface Route {
	id_route: string;
	id_driver: string;
	name: string;
	description: string;
	user_feedback?: string;
	city?: string;
	neighborhood?: string;
	status: EnumRouteStatus;
	date_start?: string;
	date_end?: string;
	mileage?: number;
	date_set: string;
	created_at: string;
	created_by: string;
	updated_at?: string;
	updated_by?: string;
	removed_at?: string;
	removed_by?: string;
}

export interface RouteDonationStep {
	id_route_donation_step: string;
	id_route: string;
	id_donation_step: string;
	stop_order?: number;
	date_start?: string;
	date_end?: string;
	created_at: string;
	created_by: string;
	updated_at?: string;
	updated_by?: string;
	removed_at?: string;
	removed_by?: string;
}

export enum EnumRouteStatus {
	Pending = "pending",
	InProgress = "in_progress",
	Done = "done",
	Error = "error",
	Canceled = "canceled",
}

export interface ICreateRouteRequest {
	id_driver: string;
	date_set: string;
	stops?: string[];
	name: string;
	description: string;
	neighborhood?: string;
	city?: string;
}
export interface ICreateRouteResponse extends Route {
	stops: RouteDonationStep[];
}

export interface IListRoutesRequest extends IPaginationRequest {
	id_driver?: string;
	driver_name?: string;
	status?: EnumRouteStatus;
	date_set?: string;
	name?: string;
	city?: string;
	neighborhood?: string;
}
export interface IRouteResponse extends Route {
	driver_name?: string;
}
export interface IListRoutesResponse extends IPaginationResponse {
	data: IRouteResponse[];
}

export interface IRouteStop extends RouteDonationStep {
	address?: Address;
}
export interface IGetRouteResponse extends Route {
	driver_name?: string;
	stops: IRouteStop[];
}

export interface IUpdateRouteRequest {
	// adm fields
	name?: string;
	city?: string;
	neighborhood?: string;
	description?: string;
	date_set?: string;
	status?: EnumRouteStatus.Canceled | EnumRouteStatus.Error;
	// driver fields
	date_start?: boolean;
	date_end?: boolean;
	mileage?: number;
	user_feedback?: string;
}
export type IUpdateRouteResponse = Route;

export interface ICreateRouteStopRequest {
	id_donation_step: string;
}
export interface ICreateRouteStopResponse extends Route {
	stops: RouteDonationStep[];
}

export interface IUpdateRouteStopRequest {
	date_start?: boolean;
}
export interface IUpdateRouteStopResponse {
	stop: RouteDonationStep;
}

export type IRemoveRouteStopResponse = IDeleteResponse;

export interface IRoute {
	list(data: IListRoutesRequest): Promise<IListRoutesResponse>;
	create(data: ICreateRouteRequest): Promise<ICreateRouteResponse>;
	get(id_route: string): Promise<IGetRouteResponse>;
	update(
		id_route: string,
		data: IUpdateRouteRequest,
	): Promise<IUpdateRouteResponse>;

	createStop(
		id_route: string,
		data: ICreateRouteStopRequest,
	): Promise<ICreateRouteStopResponse>;
	updateStop(
		id_stop: string,
		data: IUpdateRouteStopRequest,
	): Promise<IUpdateRouteStopResponse>;
	removeStop(id_stop: string): Promise<IRemoveRouteStopResponse>;
}
