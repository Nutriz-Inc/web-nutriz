/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	aplicarNoDocumento,
	gravarPreferencias,
	lerPreferencias,
	type Preferencias,
	type PreferenciaTema,
} from "@/utils/accessibility-storage";
import { carregarFonteLeituraFacil } from "@/utils/dyslexia-font";

type AccessibilityContextValue = {
	preferencias: Preferencias;
	temaEfetivo: "claro" | "escuro";
	definirTema: (tema: PreferenciaTema) => void;
	definirFonteDislexia: (ativa: boolean) => void;
	restaurarPadroes: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
	null,
);

const CONSULTA_ESCURO = "(prefers-color-scheme: dark)";

function combina(consulta: string) {
	return typeof window !== "undefined" && window.matchMedia
		? window.matchMedia(consulta).matches
		: false;
}

export function AccessibilityProvider({ children }: PropsWithChildren) {
	const [preferencias, setPreferencias] = useState<Preferencias>(() =>
		lerPreferencias(),
	);
	const [sistemaEscuro, setSistemaEscuro] = useState(() =>
		combina(CONSULTA_ESCURO),
	);
	const relogioDaTroca = useRef<number | undefined>(undefined);

	useEffect(() => {
		if (!window.matchMedia) {
			return;
		}

		const escuro = window.matchMedia(CONSULTA_ESCURO);
		const aoMudarEscuro = (e: MediaQueryListEvent) =>
			setSistemaEscuro(e.matches);

		escuro.addEventListener("change", aoMudarEscuro);

		return () => {
			escuro.removeEventListener("change", aoMudarEscuro);
		};
	}, []);

	const temaEfetivo: "claro" | "escuro" =
		preferencias.tema === "sistema"
			? sistemaEscuro
				? "escuro"
				: "claro"
			: preferencias.tema;

	useEffect(() => {
		gravarPreferencias(preferencias);
		aplicarNoDocumento({
			tema: temaEfetivo,
			fonteDislexia: preferencias.fonteDislexia,
		});
	}, [preferencias, temaEfetivo]);

	useEffect(() => {
		if (preferencias.fonteDislexia) {
			carregarFonteLeituraFacil();
		}
	}, [preferencias.fonteDislexia]);

	const definirTema = useCallback((tema: PreferenciaTema) => {
		const raiz = document.documentElement;
		raiz.dataset.trocandoTema = "";

		window.clearTimeout(relogioDaTroca.current);
		relogioDaTroca.current = window.setTimeout(() => {
			delete raiz.dataset.trocandoTema;
		}, 380);

		setPreferencias((atual) => ({ ...atual, tema }));
	}, []);

	const definirFonteDislexia = useCallback((fonteDislexia: boolean) => {
		setPreferencias((atual) => ({ ...atual, fonteDislexia }));
	}, []);

	const restaurarPadroes = useCallback(() => {
		setPreferencias({ tema: "sistema", fonteDislexia: false });
	}, []);

	const valor = useMemo(
		() => ({
			preferencias,
			temaEfetivo,
			definirTema,
			definirFonteDislexia,
			restaurarPadroes,
		}),
		[
			preferencias,
			temaEfetivo,
			definirTema,
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
