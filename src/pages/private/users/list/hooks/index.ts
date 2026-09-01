import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import services from "@/services";
import type {
	ICreateUserRequest,
	IListUsersRequest,
} from "@/services/types/i-user";

export function useUsersList(params: IListUsersRequest) {
	const usersQuery = useQuery({
		queryKey: ["users", params],
		queryFn: () => services.user.list(params),
		placeholderData: keepPreviousData,
	});

	return {
		usersQuery,
	};
}

export function useCreateUser() {
	const queryClient = useQueryClient();

	const createUserMutation = useMutation({
		mutationFn: (data: ICreateUserRequest) =>
			services.user.createInternal(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	return {
		createUserMutation,
	};
}
