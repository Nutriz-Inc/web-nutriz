import { useAuth } from "../../../../hooks/use-auth";
import { EnumUserType } from "../../../../services/types/i-user";

export type EvaAccessMode = "anonymous" | "nutriz";

// Regra de acesso ao widget da EVA. NAO existe componente Page/hasPermission
// neste repo (so EnumUserType em services/types/i-user.ts), entao o gate e
// construido sobre useAuth() + EnumUserType.
// Permitidos: visitante anonimo (nao autenticado) e nutriz (common).
// Negados: adm e nurse (staff usa painel admin, nao o chat da EVA).
// TODO: migrar para o componente Page oficial quando/se ele existir.
export function useEvaAccess() {
	const { auth, isAuthenticated } = useAuth();

	const allowed = !isAuthenticated || auth?.type === EnumUserType.USER_COMMON;

	const mode: EvaAccessMode = isAuthenticated ? "nutriz" : "anonymous";

	return { allowed, mode, userId: auth?.id_user ?? null };
}
