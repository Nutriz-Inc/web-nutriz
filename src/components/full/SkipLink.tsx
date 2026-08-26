/**
 * "Pular para o conteudo".
 *
 * Fica invisivel ate receber foco. Quem navega por teclado ou leitor de tela
 * cai nele no primeiro Tab da pagina e evita percorrer o cabecalho e o menu
 * inteiros em toda troca de tela.
 *
 * O alvo e o `<main>` — todas as telas ja tem exatamente um, entao nao foi
 * preciso criar ancora nova. `tabindex={-1}` no destino e o que faz o foco
 * realmente ir para la; sem isso o navegador rola mas o foco fica para tras.
 */
export function SkipLink() {
	return (
		<a
			href="#conteudo"
			onClick={(evento) => {
				const alvo = document.querySelector<HTMLElement>("main");
				if (!alvo) {
					return;
				}
				evento.preventDefault();
				alvo.setAttribute("tabindex", "-1");
				alvo.focus();
				alvo.scrollIntoView({ behavior: "smooth" });
			}}
			className="sr-only rounded-full bg-blue-deep-fill px-5 py-3 text-[14px] font-semibold text-white shadow-lift outline-none focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:ring-3 focus-visible:ring-blue-bright/60"
		>
			Pular para o conteúdo
		</a>
	);
}
