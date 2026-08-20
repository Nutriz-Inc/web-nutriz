import type { BadgeTone } from "@/components/ui/badge";
import { EnumDonationStepName } from "@/services/types/i-donation";

import { EnumUserType } from "@/services/types/i-user";

export const STEP_NUMBER: Record<EnumDonationStepName, number> = {
	[EnumDonationStepName.BloodTest]: 1,
	[EnumDonationStepName.DeliverMilkingKit]: 2,
	[EnumDonationStepName.CollectMilk]: 3,
	[EnumDonationStepName.MilkAnalysis]: 4,
};

export const BABY_ML_PER_DAY = 200;

export const DEFAULT_PAGE_SIZE = 50;

export const USER_TYPE_LABEL: Record<EnumUserType, string> = {
	[EnumUserType.Common]: "Doadora",
	[EnumUserType.Nurse]: "Enfermeiro(a)",
	[EnumUserType.Admin]: "Administrador(a)",
};

export const USER_TYPE_TONE: Record<EnumUserType, BadgeTone> = {
	[EnumUserType.Admin]: "brand",
	[EnumUserType.Nurse]: "purple",
	[EnumUserType.Common]: "success",
};
