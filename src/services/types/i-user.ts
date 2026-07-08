import type { IGetDonationResponse } from "./i-donation";
import type {
	IDeleteResponse,
	IPaginationRequest,
	IPaginationResponse,
} from "./i-index";

// entities
export interface Address {
	id_address: string;
	id_user?: string;
	id_donation_point?: string;
	zipcode: string;
	street: string;
	number?: string;
	city: string;
	state: string;
	neighborhood: string;
	complement?: string;
	latitude?: number;
	longitude?: number;
	created_at: string;
	updated_at?: string;
	removed_at?: string;
}

export interface User {
	id_user: string;
	internal_identifier?: string;
	type: EnumUserType;
	name: string;
	cpf: string;
	birth_date: string;
	phone_number: string;
	email: string;
	milk_donated?: number;
	created_at: string;
	created_by: string;
	updated_at?: string;
	updated_by?: string;
	removed_at?: string;
	removed_by?: string;
}

export interface UserBaby {
	id_user_baby: string;
	id_user: string;
	name?: string;
	birth_date: string;
	created_at: string;
	updated_at?: string;
	removed_at?: string;
}

export interface ConsentLog {
	id_consent_log: string;
	id_user: string;
	terms_version: string;
	accepted_at: string;
	ip_address: string;
	user_agent: string;
}

export enum EnumUserType {
	Common = "common",
	Admin = "adm",
	Nurse = "nurse",
}

// address
export interface AddressCreateBase {
	zip_code: string;
	number?: string;
	complement?: string;
}
export type ICreateAddressRequest = AddressCreateBase;
export type ICreateAddressResponse = Address;

export interface IUpdateAddressRequest {
	zip_code?: string;
	number?: string;
	complement?: string;
}
export type IUpdateAddressResponse = Address;

export type IRemoveAddressResponse = IDeleteResponse;

// consent
export interface ICreateConsentRequest {
	terms_version: string;
	ip_address: string;
	user_agent: string;
}
export type ICreateConsentResponse = ConsentLog;

// user baby
export interface UserBabyCreateBase {
	name?: string;
	birth_date: string;
}
export type ICreateUserBabyRequest = UserBabyCreateBase;
export type ICreateUserBabyResponse = UserBaby;

export interface IUpdateUserBabyRequest {
	name?: string;
	birth_date?: string;
}
export type IUpdateUserBabyResponse = UserBaby;

export type IRemoveUserBabyResponse = IDeleteResponse;

// user
export interface ICreateUserRequest {
	type: EnumUserType;
	name: string;
	cpf: string;
	email: string;
	password: string;
	phone_number: string;
	birth_date?: string;
	address?: AddressCreateBase;
	user_baby?: UserBabyCreateBase;
	consent_log?: ICreateConsentRequest;
	identifier?: string;
}
export type ICreateUserResponse = User;

export interface IGetUserRequest {
	show_address: boolean;
	show_baby: boolean;
	show_donations_completed: boolean;
	show_current_donation: boolean;
}
export interface IGetUserResponse extends User {
	current_donation?: IGetDonationResponse;
	donations_completed?: number;
	addresses?: Address[];
	babies?: UserBaby[];
}

export interface IListUsersRequest extends IPaginationRequest {
	name?: string;
	type?: EnumUserType;
	internal_identifier?: string;
}
export interface IListUsersResponse extends IPaginationResponse {
	data: User[];
}

export interface IUpdateUserRequest {
	name?: string;
	phone_number?: string;
	email?: string;
	password?: string;
}
export type IUpdateUserResponse = User;

export type IRemoveUserResponse = IDeleteResponse;

export interface IUser {
	// user
	list(data: IListUsersRequest): Promise<IListUsersResponse>;
	create(data: ICreateUserRequest): Promise<ICreateUserResponse>;
	update(
		id_user: string,
		data: IUpdateUserRequest,
	): Promise<IUpdateUserResponse>;
	get(id_user: string, data: IGetUserRequest): Promise<IGetUserResponse>;
	remove(id_user: string): Promise<IRemoveUserResponse>;

	// address
	createAddress(data: ICreateAddressRequest): Promise<ICreateAddressResponse>;
	updateAddress(
		id_address: string,
		data: IUpdateAddressRequest,
	): Promise<IUpdateAddressResponse>;
	removeAddress(id_address: string): Promise<IRemoveAddressResponse>;

	// user baby
	createBaby(data: ICreateUserBabyRequest): Promise<ICreateUserBabyResponse>;
	updateBaby(
		id_user_baby: string,
		data: IUpdateUserBabyRequest,
	): Promise<IUpdateUserBabyResponse>;
	removeBaby(id_user_baby: string): Promise<IRemoveUserBabyResponse>;

	// consent
	createConsent(data: ICreateConsentRequest): Promise<ICreateConsentResponse>;
}
