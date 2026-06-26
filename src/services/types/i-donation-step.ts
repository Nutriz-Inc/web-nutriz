export interface DonationStep {
  idDonationStep: string;
  idDonation: string;
  name: EnumDonationStepName;
  description: string;
  status: EnumDonationStepStatus;
  setDate?: Date;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  completedAt?: Date;
}

export enum EnumDonationStepName {
  BloodTest = "Exame de sangue",
  DeliverMilkingKit = "Entregar kit de ordenha",
  CollectMilk = "Coletar leite",
  MilkAnalysis = "Análise de leite",
}

export enum EnumDonationStepStatus {
  Pending = "pending",
  Review = "review",
  Done = "done",
  Warn = "warn",
  Failed = "failed",
}

export const NUMBER_OF_DONATION_STEPS = 4;

export interface IListDonationStepRequest {}

export interface IDonationStep {
  list(data: IListDonationStepRequest): Promise<IListDonationStepResponse>;
}
