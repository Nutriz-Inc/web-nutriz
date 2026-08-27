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
	PREFERENCIAS_PADRAO,
	type Preferencias,
	type PreferenciaTema,
} from "@/utils/accessibility-storage";
import { carregarFonteLeituraFacil } from "@/utils/dyslexia-font";

type AccessibilityContextValue = {
	preferencias: Preferencias;
	temaEfetivo: PreferenciaTema;
	definirTema: (tema: PreferenciaTema) => void;
	definirFonteDislexia: (ativa: boolean) => void;
	restaurarPadroes: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
	null,
);

export function AccessibilityProvider({ children }: PropsWithChildren) {
	const [preferencias, setPreferencias] = useState<Preferencias>(() =>
		lerPreferencias(),
	);
	const relogioDaTroca = useRef<number | undefined>(undefined);

	const temaEfetivo = preferencias.tema;

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
		setPreferencias(PREFERENCIAS_PADRAO);
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
