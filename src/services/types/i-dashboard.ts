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

export interface IGetAdmDashboardResponse {
    total_milk_collected: number;
    milk_collected_by_month: MilkCollectedByMonth[];
    feedback_by_score: FeedbackScoreCount[];
    average_service_time_hours?: number;
    donations_with_error: number;
    donor_recurrence_rate: number;
}

export interface IDashboard {
    getAdmDashboard(data: IGetAdmDashboardRequest): Promise<IGetAdmDashboardResponse>;
}
