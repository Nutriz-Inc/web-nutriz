import { EnumDonationStepStatus } from "@/services/types/i-donation";
import { APPOINTMENT_STEP_ORDER } from "./steps";
import type {
	Appointment,
	AppointmentDetail,
	AppointmentReport,
	AppointmentStepItem,
	AppointmentStepName,
} from "./types";

// ---------------------------------------------------------------------------
// MOCK — substituir por services.job.list({ id_user_nurse }) quando o endpoint
// de agendamentos estiver disponível. As datas usam UTC (sufixo Z) para manter
// os horários estáveis independente do fuso do navegador.
// ---------------------------------------------------------------------------

export const MOCK_APPOINTMENTS: Appointment[] = [
	// Em andamento
	{
		id: "apt-001",
		donorName: "Maria Silva",
		dateSet: "2026-07-12T09:30:00Z",
		locationName: "BLH Hosp. das Clínicas — São Paulo/SP",
		stepName: "Coleta",
		status: EnumDonationStepStatus.Review,
		hasReport: true,
	},
	{
		id: "apt-002",
		donorName: "Joana Ferreira",
		dateSet: "2026-07-12T11:00:00Z",
		locationName: "Posto de Coleta Vila Mariana — SP",
		stepName: "Exames",
		status: EnumDonationStepStatus.Pending,
		hasReport: false,
	},
	{
		id: "apt-003",
		donorName: "Carla Andrade",
		dateSet: "2026-07-13T08:15:00Z",
		locationName: "BLH Hosp. São Luiz — São Paulo/SP",
		stepName: "Análise do Leite",
		status: EnumDonationStepStatus.Warn,
		hasReport: true,
	},
	{
		id: "apt-004",
		donorName: "Aline Costa",
		dateSet: "2026-07-14T15:30:00Z",
		locationName: "Posto de Coleta Vila Mariana — SP",
		stepName: "Coleta",
		status: EnumDonationStepStatus.Pending,
		hasReport: false,
	},
	// Concluídas
	{
		id: "apt-005",
		donorName: "Renata Prado",
		dateSet: "2026-07-05T14:45:00Z",
		locationName: "Posto de Coleta Santana — SP",
		stepName: "Confirmação",
		status: EnumDonationStepStatus.Done,
		hasReport: true,
	},
	{
		id: "apt-006",
		donorName: "Beatriz Lima",
		dateSet: "2026-07-03T10:00:00Z",
		locationName: "BLH Hosp. das Clínicas — São Paulo/SP",
		stepName: "Exames",
		status: EnumDonationStepStatus.Failed,
		hasReport: true,
	},
	{
		id: "apt-007",
		donorName: "Fernanda Rocha",
		dateSet: "2026-07-01T09:15:00Z",
		locationName: "BLH Hosp. São Luiz — São Paulo/SP",
		stepName: "Confirmação",
		status: EnumDonationStepStatus.Done,
		hasReport: true,
	},
	{
		id: "apt-008",
		donorName: "Patrícia Gomes",
		dateSet: "2026-06-28T11:30:00Z",
		locationName: "Posto de Coleta Vila Mariana — São Paulo/SP",
		stepName: "Análise do Leite",
		status: EnumDonationStepStatus.Failed,
		hasReport: true,
	},
	{
		id: "apt-009",
		donorName: "Luana Martins",
		dateSet: "2026-06-25T08:00:00Z",
		locationName: "BLH Hosp. das Clínicas — São Paulo/SP",
		stepName: "Confirmação",
		status: EnumDonationStepStatus.Done,
		hasReport: true,
	},
	{
		id: "apt-010",
		donorName: "Sônia Ribeiro",
		dateSet: "2026-06-22T16:20:00Z",
		locationName: "Posto de Coleta Santana — SP",
		stepName: "Coleta",
		status: EnumDonationStepStatus.Failed,
		hasReport: true,
	},
];

const RESPONSIBLES = ["Enf. Camila Duarte", "Téc. Bruno Alves"];

const STEP_REPORT_TEXT: Record<AppointmentStepName, string> = {
	Exames:
		"Exames sorológicos dentro dos parâmetros do rBLH. Doadora apta a seguir para a coleta.",
	Coleta:
		"Coleta domiciliar realizada. Volume total de 480 ml, acondicionado e transportado sob refrigeração.",
	"Análise do Leite":
		"Análise físico-química e microbiológica aprovada. Acidez Dornic dentro do limite. Leite pasteurizado.",
	Confirmação:
		"Resultados confirmados e liberados. Volume destinado ao banco de leite. Doadora agradecida e convidada à reincidência.",
};

const STEP_FAILED_TEXT: Record<AppointmentStepName, string> = {
	Exames:
		"Exames fora dos parâmetros do rBLH. Doadora orientada e encaminhada para reavaliação.",
	Coleta:
		"Coleta interrompida. Volume insuficiente e fora das condições de conservação exigidas.",
	"Análise do Leite":
		"Acidez Dornic acima do limite aceito. Amostra descartada conforme protocolo Fiocruz/rBLH.",
	Confirmação: "Confirmação não concluída. Amostra descartada.",
};

function daysBefore(iso: string, days: number): string {
	const date = new Date(iso);
	date.setUTCDate(date.getUTCDate() - days);
	return date.toISOString();
}

function buildSteps(appointment: Appointment): AppointmentStepItem[] {
	const currentIndex = APPOINTMENT_STEP_ORDER.indexOf(appointment.stepName);
	const isFailed = appointment.status === EnumDonationStepStatus.Failed;
	const isDone = appointment.status === EnumDonationStepStatus.Done;

	return APPOINTMENT_STEP_ORDER.map((name, index) => {
		if (index < currentIndex) {
			return {
				name,
				state: "done",
				date: daysBefore(appointment.dateSet, (currentIndex - index) * 7),
			};
		}
		if (index === currentIndex) {
			if (isFailed) return { name, state: "failed", date: appointment.dateSet };
			if (isDone) return { name, state: "done", date: appointment.dateSet };
			return { name, state: "current" };
		}
		return { name, state: "locked" };
	});
}

function buildReports(steps: AppointmentStepItem[]): AppointmentReport[] {
	return steps
		.filter((step) => step.state === "done" || step.state === "failed")
		.map((step, index) => ({
			stepName: step.name,
			status:
				step.state === "failed"
					? EnumDonationStepStatus.Failed
					: EnumDonationStepStatus.Done,
			date: step.date ?? "",
			responsible: RESPONSIBLES[index % RESPONSIBLES.length],
			text:
				step.state === "failed"
					? STEP_FAILED_TEXT[step.name]
					: STEP_REPORT_TEXT[step.name],
		}));
}

function buildDetail(appointment: Appointment): AppointmentDetail {
	const steps = buildSteps(appointment);
	const reports = buildReports(steps);
	const ended =
		appointment.status === EnumDonationStepStatus.Done ||
		appointment.status === EnumDonationStepStatus.Failed;

	const endStep = steps.find(
		(step) => step.state === "done" || step.state === "failed",
	)
		? [...steps]
				.reverse()
				.find((step) => step.state === "done" || step.state === "failed")
		: undefined;

	const finalResult = ended
		? {
				status: appointment.status,
				description:
					appointment.status === EnumDonationStepStatus.Done
						? "Doação concluída com sucesso. 480 ml aprovados e destinados ao BLH."
						: `Doação encerrada na etapa ${appointment.stepName}. Amostra descartada por não atender aos parâmetros exigidos.`,
				endedAt: endStep?.date ?? appointment.dateSet,
				responsible:
					reports.length > 0
						? reports[reports.length - 1].responsible
						: RESPONSIBLES[0],
			}
		: undefined;

	return { ...appointment, ended, steps, reports, finalResult };
}

export function getMockAppointmentDetail(id: string): AppointmentDetail | null {
	const appointment = MOCK_APPOINTMENTS.find((item) => item.id === id);
	if (!appointment) return null;
	return buildDetail(appointment);
}
