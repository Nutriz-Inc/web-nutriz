import { useEffect, useRef, useState } from "react";

const DURACAO_PADRAO = 1500;

function desacelera(t: number): number {
	return 1 - (1 - t) ** 3;
}

export function useCountUp(alvo: number, duracao = DURACAO_PADRAO) {
	const ref = useRef<HTMLSpanElement | null>(null);
	const [valor, setValor] = useState(0);

	useEffect(() => {
		const elemento = ref.current;

		if (!elemento) return;

		const semMovimento = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (semMovimento || alvo === 0) {
			setValor(alvo);
			return;
		}

		let quadro = 0;
		let inicio: number | null = null;

		function anima(agora: number) {
			if (inicio === null) inicio = agora;

			const progresso = Math.min((agora - inicio) / duracao, 1);
			setValor(alvo * desacelera(progresso));

			if (progresso < 1) {
				quadro = requestAnimationFrame(anima);
			}
		}

		const observador = new IntersectionObserver(
			(entradas) => {
				if (!entradas[0]?.isIntersecting) return;

				observador.disconnect();
				quadro = requestAnimationFrame(anima);
			},
			{ threshold: 0.3 },
		);

		observador.observe(elemento);

		return () => {
			observador.disconnect();
			cancelAnimationFrame(quadro);
		};
	}, [alvo, duracao]);

	return { ref, valor };
}
