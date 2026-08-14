import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import services from "@/services";
import type { EnumJobStatus, IJobResponse } from "@/services/types/i-job";
import type { Address } from "@/services/types/i-user";
import { EnumUserType } from "@/services/types/i-user";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import type { Appointment } from "../../types";

type UseAppointmentsListParams = {
	status: EnumJobStatus;
	dateSet?: string;
};

function formatLocation(address?: Address): string {
	if (!address) return "—";

	const street = [address.street, address.number ?? "s/n"]
		.filter(Boolean)
		.join(", ");
	const region = [address.city, address.state].filter(Boolean).join("/");

	return [street, address.neighborhood, region].filter(Boolean).join(" - ");
}

function toAppointment(job: IJobResponse): Appointment {
	return {
		id: job.id_job,
		donorName: job.user_common_name ?? "—",
		dateSet: job.date_set ?? "",
		locationName: formatLocation(job.address),
		stepName: job.name,
		description: job.description,
		status: job.status,
		hasReport: Boolean(job.user_feedback),
	};
}

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
