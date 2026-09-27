import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Article } from "../data";
import { useSecaoEmLeitura } from "../hooks/use-secao-em-leitura";
import { getHeadings, headingId } from "../utils";

type IndiceDoArtigoProps = {
	article: Article;
};

export function IndiceDoArtigo({ article }: IndiceDoArtigoProps) {
	const semMovimento = useReducedMotion();
	const titulos = getHeadings(article);
	const ativa = useSecaoEmLeitura(titulos.map(headingId));

	function irPara(titulo: string) {
		const elemento = document.getElementById(headingId(titulo));
		if (!elemento) {
			return;
		}
		elemento.scrollIntoView({
			behavior: semMovimento ? "auto" : "smooth",
			block: "start",
		});
		elemento.focus({ preventScroll: true });
	}

	return (
		<nav aria-label="Neste artigo" className="flex flex-col gap-3">
			<p className="text-rotulo font-semibold uppercase tracking-[0.14em] text-ink-3">
				Neste artigo
			</p>
			<ol className="flex flex-col border-l border-line">
				{titulos.map((titulo) => {
					const atual = ativa === headingId(titulo);

					return (
						<li key={titulo}>
							<button
								type="button"
								onClick={() => irPara(titulo)}
								aria-current={atual ? "location" : undefined}
								className={cn(
									"-ml-px w-full border-l-2 py-2 pl-4 text-left text-apoio leading-snug transition-colors duration-200",
									atual
										? "border-blue-bright font-semibold text-blue-deep"
										: "border-transparent text-ink-2 hover:border-line-strong hover:text-ink",
								)}
							>
								{titulo}
							</button>
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
