import { EnumDonationStepName } from "@/services/types/i-donation";

import { EnumUserType } from "@/services/types/i-user";

export const STEP_NUMBER: Record<EnumDonationStepName, number> = {
	[EnumDonationStepName.BloodTest]: 1,
	[EnumDonationStepName.DeliverMilkingKit]: 2,
	[EnumDonationStepName.CollectMilk]: 3,
	[EnumDonationStepName.MilkAnalysis]: 4,
};

export const BABY_ML_PER_DAY = 200;

export const USER_TYPE_LABEL: Record<EnumUserType, string> = {
	[EnumUserType.Admin]: "Administrador",
	[EnumUserType.Nurse]: "Enfermeiro",
	[EnumUserType.Common]: "Doadora",
};