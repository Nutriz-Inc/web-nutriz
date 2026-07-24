import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";

export function DefaultRedirect() {
	const { auth } = useAuth();

	const target =
		auth?.type === EnumUserType.Admin ? "/gestao-doacoes" : "/home";

	return <Navigate to={target} replace />;
}
