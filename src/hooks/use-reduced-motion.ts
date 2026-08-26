import { useReducedMotion as useReducedMotionDoSistema } from "framer-motion";
import { useAccessibility } from "@/context/accessibility-context";

/**
 * Movimento reduzido: sistema OU escolha da pessoa no painel.
 *
 * Existe porque o `useReducedMotion` do framer-motion le apenas a media query
 * `prefers-reduced-motion` — ele NAO enxerga o `MotionConfig`. E o
 * `MotionConfig reducedMotion="always"`, sozinho, tambem nao basta: ele
 * desliga transform e layout, mas deixa opacidade e cor animando. Medido: com
 * so o MotionConfig, o anel de pulso do botao da EVA continuava piscando a
 * opacidade a cada 2,8s.
 *
 * Este hook e o que os componentes devem usar. O `MotionConfig` do App fica
 * como segunda camada, para qualquer `motion` que nao consulte o hook.
 */
export function useReducedMotion(): boolean {
	const doSistema = useReducedMotionDoSistema();
	const { movimentoReduzido } = useAccessibility();

	return movimentoReduzido || Boolean(doSistema);
}
