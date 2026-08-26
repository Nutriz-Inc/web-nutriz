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
	/** O que de fato vale agora, com "sistema" ja resolvido. */
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

/**
 * Preferencias de exibicao do app.
 *
 * O padrao e obedecer o `prefers-color-scheme` do sistema. A escolha manual
 * vence e fica salva; enquanto a pessoa nao escolher, a preferencia do sistema
 * continua valendo AO VIVO — mudar o tema do sistema com o app aberto muda o
 * app junto, e por isso o `matchMedia` fica observado em vez de lido so na
 * montagem.
 */
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

	// Grava e pinta no mesmo efeito: o que esta no DOM e o que esta salvo nunca
	// divergem, nem quando a mudanca vem do sistema.
	useEffect(() => {
		gravarPreferencias(preferencias);
		aplicarNoDocumento({
			tema: temaEfetivo,
			fonteDislexia: preferencias.fonteDislexia,
		});
	}, [preferencias, temaEfetivo]);

	/*
	 * O arquivo da fonte so e buscado quando a opcao liga. Desligar nao
	 * descarrega nada — o navegador ja tem o arquivo em cache e voltar a ligar
	 * fica instantaneo.
	 */
	useEffect(() => {
		if (preferencias.fonteDislexia) {
			carregarFonteLeituraFacil();
		}
	}, [preferencias.fonteDislexia]);

	const definirTema = useCallback((tema: PreferenciaTema) => {
		/*
		 * Liga a transicao so durante a troca. Um `transition` permanente em
		 * tudo deixaria qualquer hover arrastando; aqui a marca entra, o tema
		 * muda no quadro seguinte e ela sai quando a animacao termina.
		 */
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
