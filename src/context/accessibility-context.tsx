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
import { flushSync } from "react-dom";
import {
	aplicarNoDocumento,
	gravarPreferencias,
	lerPreferencias,
	PREFERENCIAS_PADRAO,
	type Preferencias,
	type PreferenciaTema,
} from "@/utils/accessibility-storage";
import { carregarFonteLeituraFacil } from "@/utils/dyslexia-font";
import {
	corDeFundoVisivel,
	elementoNaBaseDaTela,
	pintarFundoDaPagina,
} from "@/utils/fundo-da-pagina";

type AccessibilityContextValue = {
	preferencias: Preferencias;
	temaEfetivo: PreferenciaTema;
	definirTema: (tema: PreferenciaTema) => void;
	definirFonteDislexia: (ativa: boolean) => void;
	restaurarPadroes: () => void;
};

const NUCLEOS_MINIMOS = 4;

function podeAnimarATroca() {
	return (
		typeof document.startViewTransition === "function" &&
		!window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
		(navigator.hardwareConcurrency ?? NUCLEOS_MINIMOS) >= NUCLEOS_MINIMOS
	);
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
	null,
);

export function AccessibilityProvider({ children }: PropsWithChildren) {
	const [preferencias, setPreferencias] = useState<Preferencias>(() =>
		lerPreferencias(),
	);

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
		const aplicar = () => setPreferencias((atual) => ({ ...atual, tema }));

		if (!podeAnimarATroca()) {
			aplicar();
			return;
		}

		const raiz = document.documentElement;
		raiz.dataset.pausandoAnimacoes = "";

		const corAntiga = corDeFundoVisivel(elementoNaBaseDaTela());
		if (corAntiga) {
			raiz.dataset.corNaTroca = corAntiga;
			pintarFundoDaPagina(corAntiga);
		}

		const transicao = document.startViewTransition(() => {
			raiz.dataset.trocandoTema = "";
			aplicarNoDocumento({
				tema,
				fonteDislexia: raiz.dataset.fonte === "dislexia",
			});
			flushSync(aplicar);
		});

		transicao.finished.finally(() => {
			if (raiz.dataset.corNaTroca !== undefined) {
				delete raiz.dataset.corNaTroca;
				if (raiz.dataset.corDaRota) {
					pintarFundoDaPagina(raiz.dataset.corDaRota);
				}
			}
			delete raiz.dataset.pausandoAnimacoes;
			window.setTimeout(() => {
				delete raiz.dataset.trocandoTema;
			}, 60);
		});
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
