import { type RefObject, useEffect, useState } from "react";

export type BackdropTone = "claro" | "escuro";

/** Abaixo disso o fundo conta como escuro (luminancia relativa da WCAG). */
const LIMITE_ESCURO = 0.42;

/**
 * Cor de fundo atras de um elemento fixo, lida do proprio DOM.
 *
 * Serve ao botao flutuante da EVA: ele mora num canto fixo e passa por cima de
 * faixas de cores muito diferentes conforme a pagina rola. Em vez de manter uma
 * lista de "secoes escuras" — que envelhece a cada tela nova — aqui o fundo e
 * medido de verdade, com `elementsFromPoint` em cinco pontos do elemento.
 *
 * De cada ponto sobe-se a arvore ate achar uma cor: primeiro
 * `background-color`; se ela for transparente, tenta-se o `background-image`,
 * separando as paradas do degrade e tirando a media. Qualquer elemento pode
 * cravar a resposta com `data-fundo="claro" | "escuro"` — escapatoria para
 * fundo que e imagem, video ou canvas, onde nao ha cor para ler.
 *
 * A decisao usa luminancia relativa da WCAG, a mesma conta do contraste.
 */
export function useBackdropTone(
	ref: RefObject<HTMLElement | null>,
	ativo = true,
): BackdropTone {
	// Comeca em "claro": o app inteiro fora da landing e canvas claro, entao
	// esse e o palpite certo na primeira pintura, antes da primeira medicao.
	const [tom, setTom] = useState<BackdropTone>("claro");

	useEffect(() => {
		if (!ativo) {
			return;
		}

		let pendente = 0;
		let vivo = true;

		function medir() {
			pendente = 0;

			const elemento = ref.current;
			if (!elemento || !vivo) {
				return;
			}

			const caixa = elemento.getBoundingClientRect();
			if (caixa.width === 0 || caixa.height === 0) {
				return;
			}

			const luminancias: number[] = [];
			let cravado: BackdropTone | null = null;

			for (const [x, y] of pontosDeAmostra(caixa)) {
				const alvo = primeiroAtras(x, y, elemento);
				if (!alvo) {
					continue;
				}

				const resposta = corDeFundo(alvo);
				if (resposta === "claro" || resposta === "escuro") {
					cravado = resposta;
					break;
				}
				if (resposta !== null) {
					luminancias.push(resposta);
				}
			}

			const proximo =
				cravado ??
				(luminancias.length === 0
					? "claro"
					: media(luminancias) < LIMITE_ESCURO
						? "escuro"
						: "claro");

			setTom((atual) => (atual === proximo ? atual : proximo));
		}

		function agendar() {
			if (pendente) {
				return;
			}
			pendente = requestAnimationFrame(medir);
		}

		medir();

		window.addEventListener("scroll", agendar, { passive: true });
		window.addEventListener("resize", agendar);
		/*
		 * Rede de seguranca para mudanca sem rolagem: troca de rota, abertura de
		 * um painel, tema. Barato o suficiente — e um hit-test de cinco pontos.
		 */
		const relogio = window.setInterval(agendar, 500);

		return () => {
			vivo = false;
			if (pendente) {
				cancelAnimationFrame(pendente);
			}
			window.removeEventListener("scroll", agendar);
			window.removeEventListener("resize", agendar);
			window.clearInterval(relogio);
		};
	}, [ref, ativo]);

	return tom;
}

/** Centro e quatro cantos recuados: pega bem a emenda entre duas faixas. */
function pontosDeAmostra(caixa: DOMRect): [number, number][] {
	const recuo = Math.min(caixa.width, caixa.height) * 0.3;

	return [
		[caixa.left + caixa.width / 2, caixa.top + caixa.height / 2],
		[caixa.left + recuo, caixa.top + recuo],
		[caixa.right - recuo, caixa.top + recuo],
		[caixa.left + recuo, caixa.bottom - recuo],
		[caixa.right - recuo, caixa.bottom - recuo],
	];
}

/** Primeiro elemento sob o ponto que nao faz parte do proprio botao. */
function primeiroAtras(x: number, y: number, proprio: HTMLElement) {
	for (const candidato of document.elementsFromPoint(x, y)) {
		if (!proprio.contains(candidato) && candidato !== proprio) {
			return candidato;
		}
	}

	return null;
}

/**
 * Sobe a arvore procurando uma resposta: um `data-fundo` cravado, ou a
 * luminancia da primeira cor de fundo que nao seja transparente.
 */
function corDeFundo(inicio: Element): BackdropTone | number | null {
	let no: Element | null = inicio;

	while (no && no !== document.documentElement.parentElement) {
		const cravado = (no as HTMLElement).dataset?.fundo;
		if (cravado === "claro" || cravado === "escuro") {
			return cravado;
		}

		const estilo = getComputedStyle(no);

		const solida = paraRgb(estilo.backgroundColor);
		if (solida && solida[3] > 0.1) {
			return luminancia(solida);
		}

		if (estilo.backgroundImage && estilo.backgroundImage !== "none") {
			const doDegrade = luminanciaDoDegrade(estilo.backgroundImage);
			if (doDegrade !== null) {
				return doDegrade;
			}
		}

		no = no.parentElement;
	}

	return null;
}

/**
 * Media das paradas de um degrade.
 *
 * O valor computado vem como `linear-gradient(145deg, rgb(a) 0%, rgb(b) 100%)`.
 * Separar por virgulas de primeiro nivel devolve cada parada; o que nao for cor
 * (o angulo, as porcentagens) simplesmente nao normaliza e cai fora.
 */
function luminanciaDoDegrade(valor: string): number | null {
	const abre = valor.indexOf("(");
	const fecha = valor.lastIndexOf(")");
	if (abre < 0 || fecha < abre) {
		return null;
	}

	const luminancias: number[] = [];

	for (const parte of separarNoPrimeiroNivel(valor.slice(abre + 1, fecha))) {
		// Tira a posicao ("rgb(0, 0, 0) 40%" -> "rgb(0, 0, 0)").
		const semPosicao = parte.replace(/\s+-?[\d.]+(%|px|deg|rem|em)\s*$/g, "");
		const rgb = paraRgb(semPosicao.trim());

		if (rgb && rgb[3] > 0.1) {
			luminancias.push(luminancia(rgb));
		}
	}

	return luminancias.length === 0 ? null : media(luminancias);
}

function separarNoPrimeiroNivel(texto: string): string[] {
	const partes: string[] = [];
	let profundidade = 0;
	let atual = "";

	for (const caractere of texto) {
		if (caractere === "(") {
			profundidade += 1;
		}
		if (caractere === ")") {
			profundidade -= 1;
		}
		if (caractere === "," && profundidade === 0) {
			partes.push(atual);
			atual = "";
			continue;
		}
		atual += caractere;
	}

	partes.push(atual);
	return partes;
}

let pincel: CanvasRenderingContext2D | null = null;
const cacheDeCor = new Map<string, [number, number, number, number] | null>();

/**
 * Normaliza qualquer sintaxe de cor para RGB pintando um pixel e lendo de
 * volta.
 *
 * A primeira versao disso lia `getComputedStyle(...).color` de um elemento
 * sonda, o que nao funciona: o Chrome preserva o espaco de cor no valor
 * computado, entao `oklch(0.981 0.005 258.3)` voltava como ele mesmo e os tres
 * numeros eram lidos como se fossem R, G e B — branco virava quase preto e o
 * botao ficava na pele errada em toda a pagina.
 *
 * Pintar e ler resolve de vez: o proprio navegador converte, e vale para
 * `oklch`, `color-mix`, `hsl`, hex e nome. O resultado fica em cache — a
 * medicao roda a cada quadro de rolagem e as cores se repetem muito.
 */
function paraRgb(valor: string): [number, number, number, number] | null {
	if (!valor || valor === "none" || valor === "transparent") {
		return null;
	}

	const emCache = cacheDeCor.get(valor);
	if (emCache !== undefined) {
		return emCache;
	}

	if (!pincel) {
		const tela = document.createElement("canvas");
		tela.width = 1;
		tela.height = 1;
		pincel = tela.getContext("2d", { willReadFrequently: true });
	}

	let resultado: [number, number, number, number] | null = null;

	if (pincel) {
		// Um valor que o navegador nao entende deixa o fillStyle como estava;
		// pintar sobre um fundo conhecido revela isso.
		pincel.clearRect(0, 0, 1, 1);
		pincel.fillStyle = "#000000";
		pincel.fillStyle = valor;

		if (pincel.fillStyle !== "#000000" || valor.includes("0, 0, 0")) {
			pincel.fillRect(0, 0, 1, 1);
			const [r, g, b, a] = pincel.getImageData(0, 0, 1, 1).data;
			resultado = [r, g, b, a / 255];
		}
	}

	cacheDeCor.set(valor, resultado);
	return resultado;
}

/** Luminancia relativa da WCAG. */
function luminancia([r, g, b]: [number, number, number, number]): number {
	const canal = (valor: number) => {
		const escala = valor / 255;
		return escala <= 0.03928
			? escala / 12.92
			: ((escala + 0.055) / 1.055) ** 2.4;
	};

	return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

function media(valores: number[]): number {
	return valores.reduce((soma, valor) => soma + valor, 0) / valores.length;
}
