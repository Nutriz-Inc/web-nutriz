import type { BadgeTone } from "@/components/ui/badge";
import { EnumUserType } from "@/services/types/i-user";
import { USER_TYPE_TONE } from "@/utils/constants";

export const DONATIONS_GRID_COLS =
	"lg:grid-cols-[repeat(4,minmax(0,1fr))_32px]";

export const APPOINTMENTS_GRID_COLS =
	"lg:grid-cols-[repeat(6,minmax(0,1fr))_32px]";

export type UserTypeDisplay = {
	label: string;
	tone: BadgeTone;
};

export const USER_TYPE_DISPLAY: Record<EnumUserType, UserTypeDisplay> = {
	[EnumUserType.Admin]: {
		label: "Administrador",
		tone: USER_TYPE_TONE[EnumUserType.Admin],
	},
	[EnumUserType.Nurse]: {
		label: "Enfermeiro(a)",
		tone: USER_TYPE_TONE[EnumUserType.Nurse],
	},
	[EnumUserType.Common]: {
		label: "Doadora",
		tone: USER_TYPE_TONE[EnumUserType.Common],
	},
	[EnumUserType.Driver]: {
		label: "Motorista",
		tone: USER_TYPE_TONE[EnumUserType.Driver],
	},
};
