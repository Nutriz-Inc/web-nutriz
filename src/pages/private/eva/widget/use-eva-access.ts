import { useAuth } from "../../../../hooks/use-auth";
import { EnumUserType } from "../../../../services/types/i-user";

export type EvaAccessMode = "anonymous" | "nutriz";

// Regra de acesso ao widget da EVA, construida sobre useAuth() + EnumUserType
// (o componente Page/hasPermission cobre paginas, nao um widget global).
// Permitidos: visitante anonimo (nao autenticado) e nutriz (common).
// Negados: adm e nurse (staff usa painel admin, nao o chat da EVA).
export function useEvaAccess() {
	const { auth, isAuthenticated } = useAuth();

	const allowed = !isAuthenticated || auth?.type === EnumUserType.Common;

	const mode: EvaAccessMode = isAuthenticated ? "nutriz" : "anonymous";

	return { allowed, mode, userId: auth?.id_user ?? null };
}
