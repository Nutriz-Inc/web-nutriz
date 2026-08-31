import { EnumUserType } from "@/services/types/i-user";

export function getHome(userType?: EnumUserType) {
	if (!userType) return "/home";

	switch (userType) {
		case EnumUserType.Admin:
			return "/dashboard";
		case EnumUserType.Nurse:
			return "/agendamentos";
		case EnumUserType.Driver:
			return "/rotas";
		default:
			return "/home";
	}
}
