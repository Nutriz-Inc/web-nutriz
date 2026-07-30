import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";

export function DefaultRedirect() {
	const { auth } = useAuth();

	let target: string;

	switch (auth?.type) {
		case EnumUserType.Admin:
			target = "/dashboard";
			break;
		case EnumUserType.Nurse:
			target = "/agendamentos";
			break;
		default:
			target = "/home";
	}

	return <Navigate to={target} replace />;
}
