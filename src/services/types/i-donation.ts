import type { IPaginationRequest, IPaginationResponse } from "./i-index";
import type { Address, AddressCreateBase } from "./i-user";

// entities
export interface Donation {
	id_donation: string;
	is_active: boolean;
	quantity_donated?: number;
	user_feedback?: string;
	created_at: string;
	created_by: string;
	updated_at?: string;
	updated_by?: string;
	removed_at?: string;
	removed_by?: string;
}

export interface DonationPoint {
	id_donation_point: string;
	name: string;
	description?: string;
	has_home: boolean;
	phone_number?: string;
	email?: string;
	opening_hours?: string;
	removed_at?: string;
}

export interface DonationStep {
	id_donation_step: string;
	id_donation: string;
	id_address?: string;
	name: EnumDonationStepName;
	description: string;
	status: EnumDonationStepStatus;
	set_date?: string;
	created_at: string;
	created_by: string;
	updated_at?: string;
	updated_by?: string;
	completed_at?: string;
}

export interface DonationStepTimeline {
	id_donation_step_timeline: string;
	id_donation_step: string;
	id_address?: string;
	description: string;
	status: EnumDonationStepStatus;
	set_date?: string;
	created_at: string;
	created_by: string;
}

export enum EnumDonationStepName {
	BloodTest = "Exame de sangue",
	DeliverMilkingKit = "Entregar kit de ordenha",
	CollectMilk = "Coletar leite",
	MilkAnalysis = "Análise de leite",
}

export const NUMBER_OF_DONATION_STEPS = 4;

export enum EnumDonationStepStatus {
	Pending = "pending",
	Review = "review",
	Done = "done",
	Warn = "warn",
	Failed = "failed",
}

// donation
export interface IListDonationsRequest extends IPaginationRequest {
	is_active?: boolean;
	user_document?: string;
	user_name?: string;
	id_user_common?: string;
	current_step?: EnumDonationStepName;
}
export interface IDonationResponse extends Donation {
	user_document?: string;
	user_name?: string;
	current_step?: EnumDonationStepName;
}
export interface IListDonationsResponse extends IPaginationResponse {
	data: Donation[];
}

export type ICreateDonationResponse = Donation;

export interface IGetDonationResponse extends Donation {
	steps: DonationStep[];
}

export interface IUpdateDonationRequest {
	is_active?: boolean;
	quantity_donated?: number;
	user_feedback?: string;
}
export type IUpdateDonationResponse = Donation;

//donation point
export interface IListDonationPointsRequest extends IPaginationRequest {
	show_address: boolean;
	name?: string;
	has_home?: boolean;
	longitude?: number;
	latitude?: number;
	zipcode?: string;
}
export interface IDonationPointResponse extends DonationPoint {
	address: Address;
	distance_from_you?: number;
}
export interface IListDonationPointsResponse extends IPaginationResponse {
	data: IDonationPointResponse[];
}

// donation step
export interface ICreateDonationStepRequest {
	id_donation: string;
	id_address?: string;
	address?: AddressCreateBase;
	name: EnumDonationStepName;
	description: string;
	set_date?: string;
}
export type ICreateDonationStepResponse = DonationStep;

export interface IUpdateDonationStepRequest {
	id_address?: string;
	address?: AddressCreateBase;
	description: string;
	set_date?: string;
	status?: EnumDonationStepStatus;
}
export type IUpdateDonationStepResponse = DonationStep;

// donation step timeline
export interface IListDonationStepTimelinesRequest {
	id_donation_step: string;
}
export interface IListDonationStepTimelinesResponse {
	data: DonationStepTimeline[];
}

export interface IDonation {
	//donation
	list(data: IListDonationsRequest): Promise<IListDonationsResponse>;
	create(): Promise<ICreateDonationResponse>;
	update(
		id_donation: string,
		data: IUpdateDonationRequest,
	): Promise<IUpdateDonationResponse>;
	get(id_donation: string): Promise<IGetDonationResponse>;

	//donation point
	listPoints(
		data: IListDonationPointsRequest,
	): Promise<IListDonationPointsResponse>;

	//donation step
	createStep(
		data: ICreateDonationStepRequest,
	): Promise<ICreateDonationStepResponse>;
	updateStep(
		id_donation_step: string,
		data: IUpdateDonationStepRequest,
	): Promise<IUpdateDonationStepResponse>;

	//donation step timeline
	listStepTimelines(
		data: IListDonationStepTimelinesRequest,
	): Promise<IListDonationStepTimelinesResponse>;
}
