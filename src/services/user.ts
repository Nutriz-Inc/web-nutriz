import type { AxiosInstance } from "axios";
import type {
	ICreateAddressRequest,
	ICreateAddressResponse,
	ICreateConsentRequest,
	ICreateConsentResponse,
	ICreateUserBabyRequest,
	ICreateUserBabyResponse,
	ICreateUserRequest,
	ICreateUserResponse,
	IGetAddressResponse,
	IGetUserRequest,
	IGetUserResponse,
	IListUsersRequest,
	IListUsersResponse,
	IRemoveAddressResponse,
	IRemoveUserBabyResponse,
	IRemoveUserResponse,
	IUpdateAddressRequest,
	IUpdateAddressResponse,
	IUpdateUserBabyRequest,
	IUpdateUserBabyResponse,
	IUpdateUserRequest,
	IUpdateUserResponse,
	IUser,
} from "./types/i-user";

export class User implements IUser {
	constructor(private readonly httpClient: AxiosInstance) {}

	async list(params: IListUsersRequest): Promise<IListUsersResponse> {
		const { data } = await this.httpClient.get("/internal/user", {
			params,
		});

		return data;
	}

	async create(body: ICreateUserRequest): Promise<ICreateUserResponse> {
		const { data } = await this.httpClient.post("/public/user", body);

		return data;
	}

	async update(
		id_user: string,
		body: IUpdateUserRequest,
	): Promise<IUpdateUserResponse> {
		const { data } = await this.httpClient.put(
			`/internal/user/${id_user}`,
			body,
		);

		return data;
	}

	async get(
		id_user: string,
		params: IGetUserRequest,
	): Promise<IGetUserResponse> {
		const { data } = await this.httpClient.get(`/internal/user/${id_user}`, {
			params,
		});

		return data;
	}

	async remove(id_user: string): Promise<IRemoveUserResponse> {
		const { data } = await this.httpClient.delete(`/internal/user/${id_user}`);

		return data;
	}

	async createAddress(
		body: ICreateAddressRequest,
	): Promise<ICreateAddressResponse> {
		const { data } = await this.httpClient.post("/internal/user/address", body);

		return data;
	}

	async updateAddress(
		id_address: string,
		body: IUpdateAddressRequest,
	): Promise<IUpdateAddressResponse> {
		const { data } = await this.httpClient.put(
			`/internal/user/address/${id_address}`,
			body,
		);

		return data;
	}

	async removeAddress(id_address: string): Promise<IRemoveAddressResponse> {
		const { data } = await this.httpClient.delete(
			`/internal/user/address/${id_address}`,
		);

		return data;
	}

	async getAddresses(id_address: string): Promise<IGetAddressResponse> {
		const { data } = await this.httpClient.get(
			`/internal/user/address/${id_address}`,
		);

		return data;
	}

	async createBaby(
		body: ICreateUserBabyRequest,
	): Promise<ICreateUserBabyResponse> {
		const { data } = await this.httpClient.post("/internal/user/baby", body);

		return data;
	}

	async updateBaby(
		id_user_baby: string,
		body: IUpdateUserBabyRequest,
	): Promise<IUpdateUserBabyResponse> {
		const { data } = await this.httpClient.put(
			`/internal/user/baby/${id_user_baby}`,
			body,
		);

		return data;
	}

	async removeBaby(id_user_baby: string): Promise<IRemoveUserBabyResponse> {
		const { data } = await this.httpClient.delete(
			`/internal/user/baby/${id_user_baby}`,
		);

		return data;
	}

	async createConsent(
		body: ICreateConsentRequest,
	): Promise<ICreateConsentResponse> {
		const { data } = await this.httpClient.post("/public/user/consent", body);

		return data;
	}
}
