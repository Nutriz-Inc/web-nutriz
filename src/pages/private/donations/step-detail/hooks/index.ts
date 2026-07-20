import { useQuery } from "@tanstack/react-query";
import services from "@/services";

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
	});

	return { timelinesQuery };
}
