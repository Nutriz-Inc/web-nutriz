import type { IPaginationRequest, IPaginationResponse } from "./i-index";
import type { Address, AddressCreateBase } from "./i-user";

export interface Donation {
	id_donation: string;
	is_active: boolean;
	user_feedback?: string;
	score_feedback?: number;
	created_at: string;
	created_by: string;
	updated_at?: string;
	updated_by?: string;
	removed_at?: string;
	removed_by?: string;
}

export interface Bottle {
	id_bottle: string;
	id_donation: string;
	quantity_donated_ml?: number;
	discarded?: boolean;
	description?: string;
	created_at: string;
	created_by: string;
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
	has_error: boolean;
}
export interface IListDonationsResponse extends IPaginationResponse {
	data: IDonationResponse[];
}

export type ICreateDonationResponse = Donation;

export interface IGetDonationResponse extends Donation {
	steps: DonationStep[];
	bottles?: Bottle[];
}

export interface BottleUpdateBase {
	quantity_donated_ml: number;
	discarded?: boolean;
	description?: string;
}
export interface IUpdateDonationRequest {
	is_active?: boolean;
	bottles?: BottleUpdateBase[];
	user_feedback?: string;
	score_feedback?: number;
}
export type IUpdateDonationResponse = Donation;

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

export interface IListDonationStepsRequest extends IPaginationRequest {
	status?: EnumDonationStepStatus;
	id_donation?: string;
	name?: EnumDonationStepName;
	set_date?: string;
	neighborhood?: string;
	city?: string;
	has_address?: boolean;
	available_for_route?: boolean;
}
export interface IDonationStepResponse extends DonationStep {
	address?: Address;
}
export interface IListDonationStepsResponse extends IPaginationResponse {
	data: IDonationStepResponse[];
}

export interface IListDonationStepTimelinesRequest {
	id_donation_step: string;
}
export interface IListDonationStepTimelinesResponse {
	data: DonationStepTimeline[];
}

export interface IDonation {
	list(data: IListDonationsRequest): Promise<IListDonationsResponse>;
	create(): Promise<ICreateDonationResponse>;
	update(
		id_donation: string,
		data: IUpdateDonationRequest,
	): Promise<IUpdateDonationResponse>;
	get(id_donation: string): Promise<IGetDonationResponse>;

	listPoints(
		data: IListDonationPointsRequest,
	): Promise<IListDonationPointsResponse>;

	listSteps(
		data: IListDonationStepsRequest,
	): Promise<IListDonationStepsResponse>;
	createStep(
		data: ICreateDonationStepRequest,
	): Promise<ICreateDonationStepResponse>;
	updateStep(
		id_donation_step: string,
		data: IUpdateDonationStepRequest,
	): Promise<IUpdateDonationStepResponse>;

	listStepTimelines(
		data: IListDonationStepTimelinesRequest,
	): Promise<IListDonationStepTimelinesResponse>;
}
