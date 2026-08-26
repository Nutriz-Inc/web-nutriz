import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Conta de zero ate o numero do rotulo quando ele entra na tela.
 *
 * Recebe e devolve **texto**, nao numero: os rotulos da landing sao
 * "4.200+", "12 mil L", "98%" — a parte numerica e animada e o resto do
 * texto fica intacto. Sem isso seria preciso quebrar cada metrica em
 * numero + sufixo e reescrever a copy.
 *
 * Com `prefers-reduced-motion` o valor final aparece direto, sem contagem.
 */
export function useCountUp(label: string, durationMs = 1400) {
	const reduzirMovimento = useReducedMotion();
	const [texto, setTexto] = useState(() => (reduzirMovimento ? label : null));
	const alvoRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const elemento = alvoRef.current;

		if (reduzirMovimento || !elemento) {
			setTexto(label);
			return;
		}

		// Primeiro numero do rotulo, com separador de milhar opcional.
		const encontrado = label.match(/[\d.]+/);

		if (!encontrado) {
			setTexto(label);
			return;
		}

		const bruto = encontrado[0];
		const destino = Number(bruto.replace(/\./g, ""));

		if (!Number.isFinite(destino)) {
			setTexto(label);
			return;
		}

		const formatar = (valor: number) =>
			label.replace(bruto, valor.toLocaleString("pt-BR"));

		setTexto(formatar(0));

		let quadro = 0;
		let inicio = 0;

		const observador = new IntersectionObserver(
			(entradas) => {
				if (!entradas[0]?.isIntersecting) return;

				observador.disconnect();

				const passo = (agora: number) => {
					if (!inicio) inicio = agora;

					const progresso = Math.min((agora - inicio) / durationMs, 1);
					// easeOutCubic: rapido no comeco, assentando no fim.
					const suave = 1 - (1 - progresso) ** 3;

					setTexto(formatar(Math.round(destino * suave)));

					if (progresso < 1) quadro = requestAnimationFrame(passo);
				};

				quadro = requestAnimationFrame(passo);
			},
			{ threshold: 0.4 },
		);

		observador.observe(elemento);

		return () => {
			observador.disconnect();
			cancelAnimationFrame(quadro);
		};
	}, [label, durationMs, reduzirMovimento]);

	return { alvoRef, texto: texto ?? label };
}
