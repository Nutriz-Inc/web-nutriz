import { type RefObject, useEffect, useState } from "react";

export type BackdropTone = "claro" | "escuro";

const LIMITE_ESCURO = 0.42;

export function useBackdropTone(
	ref: RefObject<HTMLElement | null>,
	ativo = true,
): BackdropTone {
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

function primeiroAtras(x: number, y: number, proprio: HTMLElement) {
	for (const candidato of document.elementsFromPoint(x, y)) {
		if (!proprio.contains(candidato) && candidato !== proprio) {
			return candidato;
		}
	}

	return null;
}

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

function luminanciaDoDegrade(valor: string): number | null {
	const abre = valor.indexOf("(");
	const fecha = valor.lastIndexOf(")");
	if (abre < 0 || fecha < abre) {
		return null;
	}

	const luminancias: number[] = [];

	for (const parte of separarNoPrimeiroNivel(valor.slice(abre + 1, fecha))) {
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
