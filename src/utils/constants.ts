import type { BadgeTone } from "@/components/ui/badge";
import { EnumDonationStepName } from "@/services/types/i-donation";

import { EnumUserType } from "@/services/types/i-user";
import { RECURRENT_DONATION_STEP_NAMES } from "./donation";

export const STEP_NUMBER: Record<EnumDonationStepName, number> = {
	[EnumDonationStepName.BloodTest]: 1,
	[EnumDonationStepName.DeliverMilkingKit]: 2,
	[EnumDonationStepName.CollectMilk]: 3,
	[EnumDonationStepName.MilkAnalysis]: 4,
};

export function getStepNumber(
	name: EnumDonationStepName,
	isRecurrent?: boolean,
) {
	if (!isRecurrent) {
		return STEP_NUMBER[name];
	}

	const index = RECURRENT_DONATION_STEP_NAMES.indexOf(name);

	return index === -1 ? 0 : index + 1;
}

export const BABY_ML_PER_DAY = 200;

export const DEFAULT_PAGE_SIZE = 50;

export const USER_TYPE_LABEL: Record<EnumUserType, string> = {
	[EnumUserType.Common]: "Doadora",
	[EnumUserType.Nurse]: "Enfermeiro(a)",
	[EnumUserType.Admin]: "Administrador(a)",
	[EnumUserType.Driver]: "Motorista",
};

export const RECURRENT_DONOR_LABEL = "Doadora recorrente";

export const USER_TYPE_TONE: Record<EnumUserType, BadgeTone> = {
	[EnumUserType.Admin]: "brand",
	[EnumUserType.Nurse]: "purple",
	[EnumUserType.Common]: "success",
	[EnumUserType.Driver]: "teal",
};
