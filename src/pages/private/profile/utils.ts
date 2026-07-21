import { EnumUserType } from "@/services/types/i-user";
import type { BabyDraft } from "./components/NewBabyCard";

export function createDraft(): BabyDraft {
	return { key: crypto.randomUUID(), name: "", birth_date: "" };
}

export const USER_TYPE_LABEL: Record<EnumUserType, string> = {
	[EnumUserType.Common]: "Doadora",
	[EnumUserType.Nurse]: "Enfermeiro(a)",
	[EnumUserType.Admin]: "Administrador(a)",
};

export const USER_TYPE_BADGE_CLASSNAME: Record<EnumUserType, string> = {
	[EnumUserType.Common]: "bg-[#e6f1fb] text-[#00458b]",
	[EnumUserType.Nurse]: "bg-[#e6f1fb] text-[#00458b]",
	[EnumUserType.Admin]: "bg-[#e6f1fb] text-[#00458b]",
};