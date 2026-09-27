import { ShieldCheck } from "lucide-react";
import type { Article } from "../data";

type CabecalhoDoArtigoProps = {
	article: Article;
};

export function CabecalhoDoArtigo({ article }: CabecalhoDoArtigoProps) {
	return (
		<header className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14">
			<div className="flex flex-col gap-6 lg:pb-4">
				<p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-rotulo font-semibold uppercase tracking-[0.14em] text-blue-bright">
					{article.category}
					<span aria-hidden="true" className="h-px w-6 bg-line-strong" />
					<span className="text-ink-3">
						{article.readTimeMinutes} min de leitura
					</span>
				</p>

				<h1 className="max-w-[18ch] font-display text-titulo font-bold leading-[1.08] tracking-tight text-blue-deep sm:text-pagina lg:text-numero">
					{article.title}
				</h1>

				<div className="flex items-center gap-3 border-t border-line pt-5">
					<span
						aria-hidden="true"
						className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-tint text-apoio font-bold text-blue-deep"
					>
						{article.authorInitials}
					</span>
					<div className="flex min-w-0 flex-col">
						<span className="text-apoio font-semibold text-ink">
							{article.author}
						</span>
						<span className="text-rotulo text-ink-3">{article.date}</span>
					</div>
					<span className="ml-auto hidden items-center gap-1.5 text-rotulo text-ink-2 sm:inline-flex">
						<ShieldCheck className="size-4 text-teal" aria-hidden="true" />
						Validado por rBLH e Fiocruz
					</span>
				</div>
			</div>

			<figure className="relative overflow-hidden rounded-card bg-surface-3">
				<img
					src={article.coverImage}
					alt={article.coverAlt}
					width={article.coverWidth}
					height={article.coverHeight}
					className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]"
				/>
			</figure>
		</header>
	);
}
