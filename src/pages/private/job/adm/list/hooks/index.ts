import {
	keepPreviousData,
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import services from "@/services";
import { EnumDonationStepStatus } from "@/services/types/i-donation";
import type { EnumJobStatus, ICreateJobRequest } from "@/services/types/i-job";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { toAppointment } from "../../../utils";

type UseAdminAppointmentsListParams = {
	status?: EnumJobStatus;
	dateSet?: string;
	donorName?: string;
	nurseName?: string;
};

export function useAdminAppointmentsList({
	status,
	dateSet,
	donorName,
	nurseName,
}: UseAdminAppointmentsListParams) {
	const query = useInfiniteQuery({
		queryKey: [
			"admin-appointments-list",
			status,
			dateSet,
			donorName,
			nurseName,
		],
		initialPageParam: 1,
		queryFn: ({ pageParam }) =>
			services.job.list({
				page: pageParam,
				page_size: DEFAULT_PAGE_SIZE,
				status,
				date_set: dateSet,
				user_common_name: donorName,
				user_nurse_name: nurseName,
			}),
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.data.length < DEFAULT_PAGE_SIZE) return undefined;

			const loaded = allPages.reduce((sum, page) => sum + page.data.length, 0);
			if (lastPage.total && loaded >= lastPage.total) return undefined;

			return allPages.length + 1;
		},
		staleTime: 10000,
		placeholderData: keepPreviousData,
	});

	const appointments =
		query.data?.pages.flatMap((page) => page.data.map(toAppointment)) ?? [];
	const total = query.data?.pages[0]?.total ?? appointments.length;

	return {
		appointments,
		total,
		isLoading: query.isLoading,
		isUpdating: query.isPlaceholderData,
		hasNextPage: query.hasNextPage,
		isFetchingNextPage: query.isFetchingNextPage,
		fetchNextPage: query.fetchNextPage,
	};
}

export function usePendingDonationSteps(enabled: boolean) {
	return useQuery({
		queryKey: ["pending-donation-steps"],
		enabled,
		queryFn: async () => {
			const { data } = await services.donation.listSteps({
				page: 1,
				page_size: 50,
				status: EnumDonationStepStatus.Pending,
			});
			return data;
		},
		staleTime: 30000,
	});
}

export function useCreateAppointment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ICreateJobRequest) => services.job.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-appointments-list"] });
			queryClient.invalidateQueries({ queryKey: ["pending-donation-steps"] });
		},
	});
}
