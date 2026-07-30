import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import services from "@/services";
import type {
	ICreateUserRequest,
	IListUsersRequest,
} from "@/services/types/i-user";

export function useUsersList(params: IListUsersRequest) {
	const usersQuery = useQuery({
		queryKey: ["users", params],
		queryFn: () => services.user.list(params),
	});

	return {
		usersQuery,
	};
}

export function useCreateUser() {
	const queryClient = useQueryClient();

	const createUserMutation = useMutation({
		mutationFn: (data: ICreateUserRequest) =>
			services.user.createAdminAndNurse(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	return {
		createUserMutation,
	};
}
