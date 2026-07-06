import { useQuery } from "@tanstack/react-query";
import services from "@/services";

type UseQueryDonationPointsParams = {
	name?: string;
	has_home?: boolean;
	latitude?: number;
	longitude?: number;
	zipcode?: string;
};

export function useQueryDonationPoints(params: UseQueryDonationPointsParams) {
	return useQuery({
		queryKey: ["donation-points", params],
		queryFn: () =>
			services.donation.listPoints({
				page: 1,
				page_size: 50,
				show_address: true,
				...params,
			}),
	});
}
