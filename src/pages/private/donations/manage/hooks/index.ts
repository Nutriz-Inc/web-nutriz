import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import type { EnumDonationStepName } from "@/services/types/i-donation";

export type AdminDonationRow = {
	id_donation: string;
	number: number;
	userName: string;
	userCpf: string;
	createdAt: string;
	currentStepName: EnumDonationStepName | null;
};

async function fetchAdminDonations(): Promise<AdminDonationRow[]> {
	const { data: donations } = await services.donation.list({
		page: 1,
		page_size: 50,
	});

	const orderedDonations = [...donations].sort((a, b) =>
		a.created_at.localeCompare(b.created_at),
	);

	const uniqueUserIds = [...new Set(donations.map((d) => d.created_by))];

	const [details, users] = await Promise.all([
		Promise.all(donations.map((d) => services.donation.get(d.id_donation))),
		Promise.all(
			uniqueUserIds.map((id) =>
				services.user.get(id, {
					show_address: false,
					show_baby: false,
					show_donations_completed: false,
					show_current_donation: false,
				}),
			),
		),
	]);

	const usersById = new Map(users.map((user) => [user.id_user, user]));
	const detailsById = new Map(details.map((d) => [d.id_donation, d]));

	return orderedDonations.map((donation, index) => {
		const detail = detailsById.get(donation.id_donation);
		const user = usersById.get(donation.created_by);
		const lastStep = detail?.steps?.at(-1);

		return {
			id_donation: donation.id_donation,
			number: index + 1,
			userName: user?.name ?? "—",
			userCpf: user?.cpf ?? "",
			createdAt: donation.created_at,
			currentStepName: lastStep?.name ?? null,
		};
	});
}

export function useAdminDonationsList() {
	return useQuery({
		queryKey: ["admin-donations-list"],
		queryFn: fetchAdminDonations,
		staleTime: 10000,
	});
}