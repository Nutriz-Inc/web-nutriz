import { EnumUserType } from "@/services/types/i-user";

export const DONATIONS_GRID_COLS =
	"lg:grid-cols-[120px_1.4fr_1fr_0.9fr_1.1fr_32px]";

export const APPOINTMENTS_GRID_COLS =
	"lg:grid-cols-[1.4fr_1fr_0.9fr_0.7fr_1.6fr_1fr]";

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
