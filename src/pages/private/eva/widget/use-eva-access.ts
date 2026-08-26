import { useAuth } from "../../../../hooks/use-auth";
import { EnumUserType } from "../../../../services/types/i-user";

export type EvaAccessMode = "anonymous" | "nutriz";

export function useEvaAccess() {
	const { auth, isAuthenticated } = useAuth();

	const allowed = !isAuthenticated || auth?.type === EnumUserType.Common;

	const mode: EvaAccessMode = isAuthenticated ? "nutriz" : "anonymous";

	return { allowed, mode, userId: auth?.id_user ?? null };
}
