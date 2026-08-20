import { useCallback, useSyncExternalStore } from "react";

/**
 * Cor de fundo da bolinha de iniciais, escolhida pela nutriz no perfil.
 *
 * Sao os proprios tints do design system - nenhuma cor nova entra no sistema.
 * A escolha vive no localStorage por usuario: a API nao tem campo de avatar
 * nem de preferencia visual, e isso e enfeite, nao dado de negocio. Logo, nao
 * acompanha a pessoa em outro dispositivo.
 */
export const AVATAR_COLORS = [
	{ key: "azul", label: "Azul", bg: "bg-blue-tint", text: "text-blue-deep" },
	{ key: "rosa", label: "Rosa", bg: "bg-eva-tint", text: "text-eva" },
	{ key: "verde", label: "Verde", bg: "bg-success-tint", text: "text-success" },
	{ key: "agua", label: "Verde-água", bg: "bg-teal-tint", text: "text-teal" },
	{ key: "lilas", label: "Lilás", bg: "bg-purple-tint", text: "text-purple" },
	{ key: "uva", label: "Uva", bg: "bg-magenta-tint", text: "text-magenta" },
	{ key: "areia", label: "Areia", bg: "bg-warning-tint", text: "text-warning" },
	{ key: "ceu", label: "Céu", bg: "bg-blue-tint-2", text: "text-blue-deep" },
] as const;

export type AvatarColorKey = (typeof AVATAR_COLORS)[number]["key"];

const PADRAO: AvatarColorKey = "azul";
const PREFIXO = "avatar-color";

function chave(idUser: string | undefined): string {
	return `${PREFIXO}:${idUser ?? "anonimo"}`;
}

function ehValida(valor: string | null): valor is AvatarColorKey {
	return AVATAR_COLORS.some((cor) => cor.key === valor);
}

// Store minimo com listeners: os dois avatares (header e perfil) precisam
// mudar juntos, e o evento "storage" do navegador so dispara em outra aba.
const listeners = new Set<() => void>();

function avisar() {
	for (const listener of listeners) {
		listener();
	}
}

function assinar(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

export function getAvatarColor(idUser: string | undefined): AvatarColorKey {
	const salva = localStorage.getItem(chave(idUser));
	return ehValida(salva) ? salva : PADRAO;
}

export function useAvatarColor(idUser: string | undefined) {
	const key = useSyncExternalStore(
		assinar,
		() => getAvatarColor(idUser),
		() => PADRAO,
	);

	const setKey = useCallback(
		(proxima: AvatarColorKey) => {
			localStorage.setItem(chave(idUser), proxima);
			avisar();
		},
		[idUser],
	);

	const cor = AVATAR_COLORS.find((c) => c.key === key) ?? AVATAR_COLORS[0];

	return { key, cor, setKey };
}
