import { EnumDonationStepName } from "@/services/types/i-donation";

export const RECURRENT_DONATION_STEP_NAMES: EnumDonationStepName[] = [
    EnumDonationStepName.CollectMilk,
    EnumDonationStepName.MilkAnalysis,
];

export const NUMBER_OF_DONATION_STEPS = 4;

export const NUMBER_OF_RECURRENT_DONATION_STEPS =
    RECURRENT_DONATION_STEP_NAMES.length;

export function getNumberOfDonationSteps(isRecurrent?: boolean) {
    return isRecurrent
        ? NUMBER_OF_RECURRENT_DONATION_STEPS
        : NUMBER_OF_DONATION_STEPS;
}