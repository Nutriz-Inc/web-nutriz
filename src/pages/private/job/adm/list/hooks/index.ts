import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import services from "@/services";
import type { EnumJobStatus } from "@/services/types/i-job";
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
