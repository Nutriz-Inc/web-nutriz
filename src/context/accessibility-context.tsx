/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	aplicarNoDocumento,
	gravarPreferencias,
	lerPreferencias,
	type PreferenciaMovimento,
	type Preferencias,
	type PreferenciaTema,
} from "@/utils/accessibility-storage";

type AccessibilityContextValue = {
	preferencias: Preferencias;
	/** O que de fato vale agora, com "sistema" ja resolvido. */
	temaEfetivo: "claro" | "escuro";
	movimentoReduzido: boolean;
	definirTema: (tema: PreferenciaTema) => void;
	definirMovimento: (movimento: PreferenciaMovimento) => void;
	definirFonteDislexia: (ativa: boolean) => void;
	restaurarPadroes: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
	null,
);

const CONSULTA_ESCURO = "(prefers-color-scheme: dark)";
const CONSULTA_MOVIMENTO = "(prefers-reduced-motion: reduce)";

function combina(consulta: string) {
	return typeof window !== "undefined" && window.matchMedia
		? window.matchMedia(consulta).matches
		: false;
}

/**
 * Preferencias de exibicao do app.
 *
 * O padrao e obedecer o sistema operacional (`prefers-color-scheme` e
 * `prefers-reduced-motion`). A escolha manual vence e fica salva; enquanto
 * a pessoa nao escolher, a preferencia do sistema continua valendo AO VIVO —
 * mudar o tema do sistema com o app aberto muda o app junto, e por isso os
 * dois `matchMedia` ficam observados em vez de lidos so na montagem.
 */
export function AccessibilityProvider({ children }: PropsWithChildren) {
	const [preferencias, setPreferencias] = useState<Preferencias>(() =>
		lerPreferencias(),
	);
	const [sistemaEscuro, setSistemaEscuro] = useState(() =>
		combina(CONSULTA_ESCURO),
	);
	const [sistemaSemMovimento, setSistemaSemMovimento] = useState(() =>
		combina(CONSULTA_MOVIMENTO),
	);

	useEffect(() => {
		if (!window.matchMedia) {
			return;
		}

		const escuro = window.matchMedia(CONSULTA_ESCURO);
		const movimento = window.matchMedia(CONSULTA_MOVIMENTO);
		const aoMudarEscuro = (e: MediaQueryListEvent) =>
			setSistemaEscuro(e.matches);
		const aoMudarMovimento = (e: MediaQueryListEvent) =>
			setSistemaSemMovimento(e.matches);

		escuro.addEventListener("change", aoMudarEscuro);
		movimento.addEventListener("change", aoMudarMovimento);

		return () => {
			escuro.removeEventListener("change", aoMudarEscuro);
			movimento.removeEventListener("change", aoMudarMovimento);
		};
	}, []);

	const temaEfetivo: "claro" | "escuro" =
		preferencias.tema === "sistema"
			? sistemaEscuro
				? "escuro"
				: "claro"
			: preferencias.tema;

	const movimentoReduzido =
		preferencias.movimento === "sistema"
			? sistemaSemMovimento
			: preferencias.movimento === "reduzido";

	// Grava e pinta no mesmo efeito: o que esta no DOM e o que esta salvo nunca
	// divergem, nem quando a mudanca vem do sistema.
	useEffect(() => {
		gravarPreferencias(preferencias);
		aplicarNoDocumento({
			tema: temaEfetivo,
			movimento: movimentoReduzido ? "reduzido" : "normal",
			fonteDislexia: preferencias.fonteDislexia,
		});
	}, [preferencias, temaEfetivo, movimentoReduzido]);

	const definirTema = useCallback((tema: PreferenciaTema) => {
		setPreferencias((atual) => ({ ...atual, tema }));
	}, []);

	const definirMovimento = useCallback((movimento: PreferenciaMovimento) => {
		setPreferencias((atual) => ({ ...atual, movimento }));
	}, []);

	const definirFonteDislexia = useCallback((fonteDislexia: boolean) => {
		setPreferencias((atual) => ({ ...atual, fonteDislexia }));
	}, []);

	const restaurarPadroes = useCallback(() => {
		setPreferencias({
			tema: "sistema",
			movimento: "sistema",
			fonteDislexia: false,
		});
	}, []);

	const valor = useMemo(
		() => ({
			preferencias,
			temaEfetivo,
			movimentoReduzido,
			definirTema,
			definirMovimento,
			definirFonteDislexia,
			restaurarPadroes,
		}),
		[
			preferencias,
			temaEfetivo,
			movimentoReduzido,
			definirTema,
			definirMovimento,
			definirFonteDislexia,
			restaurarPadroes,
		],
	);

	return (
		<AccessibilityContext.Provider value={valor}>
			{children}
		</AccessibilityContext.Provider>
	);
}

export function useAccessibility() {
	const contexto = useContext(AccessibilityContext);

	if (!contexto) {
		throw new Error(
			"useAccessibility precisa estar dentro de <AccessibilityProvider>",
		);
	}

	return contexto;
}
