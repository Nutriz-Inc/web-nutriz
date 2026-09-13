import { useAuth } from "../../../../hooks/use-auth";
import { EnumUserType } from "../../../../services/types/i-user";

export type EvaAccessMode = "anonymous" | "nutriz" | "adm" | "nurse" | "driver";

const MODO_POR_PAPEL: Record<EnumUserType, EvaAccessMode> = {
	[EnumUserType.Common]: "nutriz",
	[EnumUserType.Admin]: "adm",
	[EnumUserType.Nurse]: "nurse",
	[EnumUserType.Driver]: "driver",
};

export function useEvaAccess() {
	const { auth, isAuthenticated } = useAuth();

	const mode: EvaAccessMode = !isAuthenticated
		? "anonymous"
		: (MODO_POR_PAPEL[auth?.type as EnumUserType] ?? "nutriz");

	return { allowed: true, mode, userId: auth?.id_user ?? null };
}
