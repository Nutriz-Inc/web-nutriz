import { EnumUserType } from "@/services/types/i-user";

export const DONATIONS_GRID_COLS =
	"lg:grid-cols-[repeat(5,minmax(0,1fr))_32px]";

export const APPOINTMENTS_GRID_COLS =
	"lg:grid-cols-[repeat(6,minmax(0,1fr))_32px]";

export type UserTypeDisplay = {
	label: string;
	bg: string;
	text: string;
};

export const USER_TYPE_DISPLAY: Record<EnumUserType, UserTypeDisplay> = {
	[EnumUserType.Admin]: {
		label: "Administrador",
		bg: "bg-[#e1f1fb]",
		text: "text-[#00458b]",
	},
	[EnumUserType.Nurse]: {
		label: "Enfermeiro(a)",
		bg: "bg-[#e1f1fb]",
		text: "text-[#00458b]",
	},
	[EnumUserType.Common]: {
		label: "Doadora",
		bg: "bg-[#fce4f0]",
		text: "text-[#f2579f]",
	},
};
