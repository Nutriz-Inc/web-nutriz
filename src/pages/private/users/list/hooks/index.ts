import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import type { IListUsersRequest } from "@/services/types/i-user";

export function useUsersList(params: IListUsersRequest) {
	const usersQuery = useQuery({
		queryKey: ["users", params],
		queryFn: () => services.user.list(params),
	});

	return {
		usersQuery,
	};
}
