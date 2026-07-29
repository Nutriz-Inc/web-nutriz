import { EnumUserType } from "@/services/types/i-user";

export const USER_TYPE_LABEL: Record<EnumUserType, string> = {
	[EnumUserType.Admin]: "Administrador",
	[EnumUserType.Nurse]: "Enfermeiro",
	[EnumUserType.Common]: "Doadora",
};
