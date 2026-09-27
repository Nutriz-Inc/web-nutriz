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
	definirTema: (tema: PreferenciaTema, origem?: OrigemDaTroca) => void;
	definirFonteDislexia: (ativa: boolean) => void;
	restaurarPadroes: () => void;
};

const NUCLEOS_MINIMOS = 4;

const DURACAO_DA_REVELACAO = 480;

type OrigemDaTroca = { x: number; y: number };

function revelarAPartirDe(origem: OrigemDaTroca) {
	const raio = Math.hypot(
		Math.max(origem.x, window.innerWidth - origem.x),
		Math.max(origem.y, window.innerHeight - origem.y),
	);

	document.documentElement.animate(
		{
			clipPath: [
				`circle(0px at ${origem.x}px ${origem.y}px)`,
				`circle(${raio}px at ${origem.x}px ${origem.y}px)`,
			],
		},
		{
			duration: DURACAO_DA_REVELACAO,
			easing: "cubic-bezier(0.65, 0, 0.35, 1)",
			pseudoElement: "::view-transition-new(root)",
		},
	);
}

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

	const definirTema = useCallback(
		(tema: PreferenciaTema, origem?: OrigemDaTroca) => {
			const aplicar = () => setPreferencias((atual) => ({ ...atual, tema }));

			if (!podeAnimarATroca()) {
				aplicar();
				return;
			}

			const raiz = document.documentElement;
			raiz.dataset.pausandoAnimacoes = "";
			if (origem) {
				raiz.dataset.revelandoTema = "";
			}
			const elementoNaBase = elementoNaBaseDaTela();

			const transicao = document.startViewTransition(() => {
				raiz.dataset.trocandoTema = "";
				aplicarNoDocumento({
					tema,
					fonteDislexia: raiz.dataset.fonte === "dislexia",
				});
				flushSync(aplicar);

				const corNaTroca = corDeFundoVisivel(elementoNaBase);
				if (corNaTroca) {
					raiz.dataset.corNaTroca = corNaTroca;
					pintarFundoDaPagina(corNaTroca);
				}
			});

			if (origem) {
				transicao.ready.then(() => revelarAPartirDe(origem)).catch(() => {});
			}

			transicao.finished.finally(() => {
				delete raiz.dataset.revelandoTema;
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
		},
		[],
	);

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
