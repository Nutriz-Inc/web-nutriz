import { EnumJobStatus } from "@/services/types/i-job";
import { formatDateBR } from "@/utils/formatter";
import type { AppointmentDetail, AppointmentStepItem } from "../types";
import {
	STEP_DEFINITIONS,
	type StepDefinition,
} from "../../donations/common/info/constants";

export function getSubLabel(step: AppointmentStepItem, ended: boolean): string {
	const date = step.date ? ` · ${formatDateBR(step.date)}` : "";
	switch (step.state) {
		case "done":
			return `Concluída${date}`;
		case "failed":
			return `Não concluída${date}`;
		case "current":
			return "Etapa atual";
		default:
			return ended ? "Não realizada" : "Aguardando liberação";
	}
}

export function getStepLabel(appointment: AppointmentDetail): string {
	if (appointment.status === EnumJobStatus.Failed) {
		return "Interrompida na etapa";
	}
	if (appointment.status === EnumJobStatus.Done) {
		return "Etapa final da doação";
	}
	return "Etapa atual da doação";
}

export function findStepDefinition(
	jobName: string,
): StepDefinition | undefined {
	return STEP_DEFINITIONS.find((definition) => definition.name === jobName);
}
