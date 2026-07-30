import { EnumUserType } from "@/services/types/i-user";

export function getHome(userType?: EnumUserType) {
	if (!userType) return "/home";

	switch (userType) {
		case EnumUserType.Admin:
			return "/dashboard";
			break;
		case EnumUserType.Nurse:
			return "/agendamentos";
			break;
		default:
			return "/home";
	}
}
