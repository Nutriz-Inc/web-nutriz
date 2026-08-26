import { Accessibility } from "lucide-react";
import { useRef, useState } from "react";
import { AccessibilityPanel } from "./AccessibilityPanel";

/**
 * Botao fixo que abre o painel de acessibilidade.
 *
 * Fica no canto de BAIXO A ESQUERDA, oposto ao botao da EVA — dois flutuantes
 * no mesmo canto brigariam.
 *
 * E botao fixo, e nao item de cabecalho, porque o requisito e alcancar o
 * painel de qualquer tela: login e cadastro nao tem cabecalho nenhum, entao
 * um item de menu deixaria justamente as duas primeiras telas de fora.
 */
export function AccessibilityWidget() {
	const [aberto, setAberto] = useState(false);
	const botaoRef = useRef<HTMLButtonElement>(null);

	/*
	 * Devolve o foco ao botao ao fechar. O Radix ja tenta fazer isso sozinho,
	 * mas so acerta quando o botao estava com foco na hora de abrir — quem abriu
	 * com o mouse voltaria com o foco no comeco da pagina, e quem navega por
	 * teclado perderia o lugar.
	 */
	function aoMudar(proximo: boolean) {
		setAberto(proximo);
		if (!proximo) {
			requestAnimationFrame(() => botaoRef.current?.focus());
		}
	}

	return (
		<>
			<button
				type="button"
				ref={botaoRef}
				onClick={() => setAberto(true)}
				aria-label="Abrir opções de acessibilidade"
				aria-haspopup="dialog"
				aria-expanded={aberto}
				className="pb-safe fixed bottom-5 left-5 z-[60] flex size-12 items-center justify-center rounded-full border border-line bg-surface text-blue-deep shadow-lift outline-none transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-blue-bright/60 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100"
			>
				<Accessibility className="size-6" aria-hidden="true" />
			</button>

			<AccessibilityPanel open={aberto} onOpenChange={aoMudar} />
		</>
	);
}
