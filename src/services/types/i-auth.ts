import type { Address } from "./i-address";
import type { EnumUserType } from "./i-user";

export interface IAuthRequest {
	document: string;
	password: string;
}

export interface IAuthResponse {
	token: string;
	id_user: string;
    name: string;
    type: EnumUserType;
    addresses: Address[];
}
