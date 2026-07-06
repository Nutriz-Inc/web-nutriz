import type { EnumUserType } from "./i-user";

export interface IAuthRequest {
	email: string;
	password: string;
}

export interface IAuthResponse {
	token: string;
	id_user: string;
	name: string;
	type: EnumUserType;
}

export interface IAuth {
	login(data: IAuthRequest): Promise<IAuthResponse>;
}
