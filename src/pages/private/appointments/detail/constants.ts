import { EnumDonationStepStatus } from "@/services/types/i-donation";
import type { AppointmentStatus } from "../types";

// Descrições exibidas em cada opção de status no formulário de atualização
// da etapa (visão de agendamento em andamento).
export const STATUS_OPTION_DESCRIPTION: Record<AppointmentStatus, string> = {
	[EnumDonationStepStatus.Pending]: "Antes da realização da ação.",
	[EnumDonationStepStatus.Review]: "A ação aconteceu, mas ainda não deu certo.",
	[EnumDonationStepStatus.Warn]: "Não deu certo, porém pode ser revertido.",
	[EnumDonationStepStatus.Done]: "Ação deu certo e a doação foi encerrada.",
	[EnumDonationStepStatus.Failed]:
		"Etapa não deu certo e a doação foi encerrada.",
};

// Ordem das opções no formulário, seguindo o design.
export const STATUS_OPTION_ORDER: AppointmentStatus[] = [
	EnumDonationStepStatus.Pending,
	EnumDonationStepStatus.Review,
	EnumDonationStepStatus.Warn,
	EnumDonationStepStatus.Done,
	EnumDonationStepStatus.Failed,
];
