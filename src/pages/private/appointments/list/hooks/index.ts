import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import services from "@/services";
import { EnumUserType } from "@/services/types/i-user";
import { toAppointment } from "../../mapper";

export const APPOINTMENTS_PAGE_SIZE = 50;

export function useAppointmentsList() {
	const { auth } = useAuth();
	const id_user_nurse =
		auth?.type === EnumUserType.Nurse ? auth.id_user : undefined;

	const query = useInfiniteQuery({
		queryKey: ["appointments-list", id_user_nurse],
		enabled: Boolean(id_user_nurse),
		initialPageParam: 1,
		queryFn: ({ pageParam }) =>
			services.job.list({
				page: pageParam,
				page_size: APPOINTMENTS_PAGE_SIZE,
				id_user_nurse,
			}),
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.data.length < APPOINTMENTS_PAGE_SIZE) return undefined;

			const loaded = allPages.reduce((sum, page) => sum + page.data.length, 0);
			if (lastPage.total && loaded >= lastPage.total) return undefined;

			return allPages.length + 1;
		},
		staleTime: 10000,
	});

	const appointments =
		query.data?.pages.flatMap((page) => page.data.map(toAppointment)) ?? [];
	const total = query.data?.pages[0]?.total ?? appointments.length;

	return {
		appointments,
		total,
		isLoading: query.isLoading,
		hasNextPage: query.hasNextPage,
		isFetchingNextPage: query.isFetchingNextPage,
		fetchNextPage: query.fetchNextPage,
	};
}
