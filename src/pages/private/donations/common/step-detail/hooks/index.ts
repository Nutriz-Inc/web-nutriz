import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { OPCOES_AO_VIVO } from "@/utils/live-query";

export function useLatestStepJob(id_step?: string) {
	const jobQuery = useQuery({
		queryKey: ["donation-step-job", id_step],
		queryFn: () =>
			services.job.list({
				page: 1,
				page_size: DEFAULT_PAGE_SIZE,
				id_step: id_step as string,
			}),
		enabled: Boolean(id_step),
		...OPCOES_AO_VIVO,
	});

	const latestJob = [...(jobQuery.data?.data ?? [])].sort((a, b) =>
		b.created_at.localeCompare(a.created_at),
	)[0];

	return { latestJob, isLoading: jobQuery.isLoading };
}

export function useStepAddress(id_address?: string) {
	const addressQuery = useQuery({
		queryKey: ["user-address", id_address],
		queryFn: () => services.user.getAddresses(id_address as string),
		enabled: Boolean(id_address),
	});

	return { addressQuery };
}

export function useStepTimelines(id_donation_step: string, enabled = true) {
	const timelinesQuery = useQuery({
		queryKey: ["donation-step-timelines", id_donation_step],
		queryFn: () => services.donation.listStepTimelines({ id_donation_step }),
		enabled: enabled && Boolean(id_donation_step),
		...OPCOES_AO_VIVO,
	});

	return { timelinesQuery };
}
