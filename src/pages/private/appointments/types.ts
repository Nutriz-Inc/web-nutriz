import type { EnumJobStatus } from "@/services/types/i-job";

export type AppointmentStatus = EnumJobStatus;

export type Appointment = {
	id: string;
	donorName: string;
	dateSet: string;
	locationName: string;
	stepName: string;
	description: string;
	status: AppointmentStatus;
	hasReport: boolean;
};

export type AppointmentStepState = "done" | "failed" | "current" | "locked";

export type AppointmentStepItem = {
	name: string;
	state: AppointmentStepState;
	date?: string;
};

export type AppointmentReport = {
	stepName: string;
	status: AppointmentStatus;
	date: string;
	responsible: string;
	text: string;
};

export type AppointmentFinalResult = {
	status: AppointmentStatus;
	description: string;
	endedAt: string;
	responsible: string;
};

export type AppointmentDetail = Appointment & {
	ended: boolean;
	donorPhone?: string;
	donorEmail?: string;
	finalResult?: AppointmentFinalResult;
	steps: AppointmentStepItem[];
	reports: AppointmentReport[];
};
