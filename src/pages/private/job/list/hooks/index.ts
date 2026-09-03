import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import services from "@/services";
import type { EnumJobStatus } from "@/services/types/i-job";
import { EnumUserType } from "@/services/types/i-user";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { toAppointment } from "../../utils";

type UseAppointmentsListParams = {
	status: EnumJobStatus;
	dateSet?: string;
};

export function useAppointmentsList({
	status,
	dateSet,
}: UseAppointmentsListParams) {
	const { auth } = useAuth();
	const id_user_nurse =
		auth?.type === EnumUserType.Nurse ? auth.id_user : undefined;

	const query = useInfiniteQuery({
		queryKey: ["appointments-list", id_user_nurse, status, dateSet],
		enabled: Boolean(id_user_nurse),
		initialPageParam: 1,
		queryFn: ({ pageParam }) =>
			services.job.list({
				page: pageParam,
				page_size: DEFAULT_PAGE_SIZE,
				id_user_nurse,
				status,
				date_set: dateSet,
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
