import { keepPreviousData, useQuery } from "@tanstack/react-query";
import services from "@/services";
import type { EnumDonationStepName } from "@/services/types/i-donation";

export type AdminDonationRow = {
	id_donation: string;
	userName: string;
	userCpf: string;
	createdAt: string;
	currentStepName: EnumDonationStepName | null;
	isActive: boolean;
	hasError: boolean;
};

type UseAdminDonationsListParams = {
	page: number;
	page_size: number;
	user_name?: string;
	user_document?: string;
	current_step?: EnumDonationStepName;
	is_active?: boolean;
};

type AdminDonationsListResult = {
	data: AdminDonationRow[];
	page: number;
	page_size: number;
	total: number;
};

async function fetchAdminDonations(
	params: UseAdminDonationsListParams,
): Promise<AdminDonationsListResult> {
	const {
		data: donations,
		page,
		page_size,
		total,
	} = await services.donation.list(params);

	return {
		data: donations.map((donation) => ({
			id_donation: donation.id_donation,
			userName: donation.user_name ?? "—",
			userCpf: donation.user_document ?? "",
			createdAt: donation.created_at,
			currentStepName: donation.current_step ?? null,
			isActive: donation.is_active,
			hasError: donation.has_error,
		})),
		page,
		page_size,
		total,
	};
}

export function useAdminDonationsList(params: UseAdminDonationsListParams) {
	return useQuery({
		queryKey: ["admin-donations-list", params],
		queryFn: () => fetchAdminDonations(params),
		staleTime: 10000,
		placeholderData: keepPreviousData,
	});
}
