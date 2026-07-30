import type { EnumDonationStepName } from "./i-donation";

export interface IGetAdmDashboardRequest {
start_date?: string;
end_date?: string;
}

export interface MilkCollectedByMonth {
    month: string;
    total: number;
}

export interface FeedbackScoreCount {
    score: number;
    count: number;
}

export interface ActiveDonationsByStep {
    step: EnumDonationStepName;
    count: number;
    percentage: number;
}

export interface IGetAdmDashboardResponse {
    total_milk_collected: number;
    milk_collected_by_month: MilkCollectedByMonth[];
    feedback_by_score: FeedbackScoreCount[];
    average_service_time_hours?: number;
    donations_with_error: number;
    donor_recurrence_rate: number;
    active_donations_by_step: ActiveDonationsByStep[];
}

export interface IDashboard {
    getAdmDashboard(data: IGetAdmDashboardRequest): Promise<IGetAdmDashboardResponse>;
}
