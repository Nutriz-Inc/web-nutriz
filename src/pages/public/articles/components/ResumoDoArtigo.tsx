import type { Article } from "../data";

type ResumoDoArtigoProps = {
	article: Article;
};

export function ResumoDoArtigo({ article }: ResumoDoArtigoProps) {
	return (
		<section aria-labelledby="resumo-do-artigo" className="flex flex-col gap-4">
			<h2
				id="resumo-do-artigo"
				className="text-rotulo font-semibold uppercase tracking-[0.14em] text-ink-3"
			>
				Neste texto
			</h2>
			<ol className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
				{article.takeaways.map((ponto, indice) => (
					<li
						key={ponto}
						className="flex gap-3 border-t border-line py-3 text-apoio leading-snug text-ink"
					>
						<span
							aria-hidden="true"
							className="font-display text-apoio font-bold tabular-nums text-blue-bright"
						>
							{String(indice + 1).padStart(2, "0")}
						</span>
						{ponto}
					</li>
				))}
			</ol>
		</section>
	);
}
