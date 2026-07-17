import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import type { EnumDonationStepName } from "@/services/types/i-donation";

export type AdminDonationRow = {
	id_donation: string;
	userName: string;
	userCpf: string;
	createdAt: string;
	currentStepName: EnumDonationStepName | null;
	isActive: boolean;
};

type UseAdminDonationsListParams = {
	user_name?: string;
	user_document?: string;
	current_step?: EnumDonationStepName;
	is_active?: boolean;
};

async function fetchAdminDonations(
	params: UseAdminDonationsListParams,
): Promise<AdminDonationRow[]> {
	const { data: donations } = await services.donation.list({
		page: 1,
		page_size: 50,
		...params,
	});

	return donations.map((donation) => ({
		id_donation: donation.id_donation,
		userName: donation.user_name ?? "—",
		userCpf: donation.user_document ?? "",
		createdAt: donation.created_at,
		currentStepName: donation.current_step ?? null,
		isActive: donation.is_active,
	}));
}

export function useAdminDonationsList(params: UseAdminDonationsListParams) {
	return useQuery({
		queryKey: ["admin-donations-list", params],
		queryFn: () => fetchAdminDonations(params),
		staleTime: 10000,
	});
}
