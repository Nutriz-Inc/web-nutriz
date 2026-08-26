import { useEffect, useSyncExternalStore } from "react";
import { useAccessibility } from "@/context/accessibility-context";
import { getAppPathname, subscribeAppPath } from "@/lib/app-navigation";

/**
 * Cor do topo do celular, acompanhando a tela atual.
 *
 * Duas superficies precisam da mesma cor, e por caminhos diferentes:
 *
 * 1. `meta[name=theme-color]` — a barra de status do Safari. A pagina nao
 *    desenha ali; quem pinta e essa meta.
 * 2. O fundo de `html` e `body` — e o que aparece na faixa da safe area e
 *    quando a pessoa puxa a pagina para baixo no topo (rubber band do iOS).
 *
 * A primeira pintura acontece antes daqui, num script inline no index.html:
 * este hook so mantem a cor em dia quando a rota muda.
 *
 * Com uma cor fixa, uma das duas sempre destoava: azul deixava um degrau
 * escuro acima das telas claras, claro deixava uma tarja branca acima da
 * landing (que abre com o hero azul). Aqui as duas seguem a rota.
 *
 * Hex e nao variavel CSS porque a meta tag nao le `var()`. Sao os mesmos
 * tokens do design system: --blue-deep e --canvas, nos dois temas.
 */
const AZUL_PROFUNDO = "#00325c";
const CANVAS_CLARO = "#eef3fa";
/* Mesmo valor de `--canvas` no bloco `[data-tema="escuro"]` do index.css. */
const CANVAS_ESCURO = "#111720";

/**
 * Unica tela que abre com o topo escuro no tema claro e o hero da landing —
 * ele continua azul nos dois temas, porque as secoes escuras da landing sao
 * superficie de marca e nao acompanham o tema.
 */
function corDaRota(
	pathname: string,
	isAuthenticated: boolean,
	temaEscuro: boolean,
): string {
	if (!isAuthenticated && (pathname === "/" || pathname === "")) {
		return AZUL_PROFUNDO;
	}

	return temaEscuro ? CANVAS_ESCURO : CANVAS_CLARO;
}

export function useThemeColor(isAuthenticated: boolean): void {
	const pathname = useSyncExternalStore(
		subscribeAppPath,
		getAppPathname,
		getAppPathname,
	);

	const { temaEfetivo } = useAccessibility();
	const cor = corDaRota(pathname, isAuthenticated, temaEfetivo === "escuro");

	useEffect(() => {
		const meta = document.querySelector<HTMLMetaElement>(
			'meta[name="theme-color"]',
		);

		if (meta && meta.content !== cor) {
			meta.content = cor;
		}

		// `html` e `body`: se so o html tiver cor e ela for removida por algum
		// motivo, o fundo do body e que propaga para a area fora da pagina.
		document.documentElement.style.backgroundColor = cor;
		document.body.style.backgroundColor = cor;
	}, [cor]);
}
