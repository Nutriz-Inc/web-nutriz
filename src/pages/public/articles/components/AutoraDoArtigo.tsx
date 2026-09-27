import type { Article } from "../data";

type AutoraDoArtigoProps = {
	article: Article;
};

export function AutoraDoArtigo({ article }: AutoraDoArtigoProps) {
	return (
		<section
			aria-label="Sobre a autora"
			className="flex items-start gap-4 border-t border-line pt-6"
		>
			<span
				aria-hidden="true"
				className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-tint text-apoio font-bold text-blue-deep"
			>
				{article.authorInitials}
			</span>
			<div className="flex flex-col gap-1">
				<p className="text-rotulo font-semibold uppercase tracking-[0.14em] text-ink-3">
					Escrito por
				</p>
				<p className="text-corpo font-semibold text-ink">{article.author}</p>
				<p className="max-w-[60ch] text-apoio leading-relaxed text-ink-2">
					{article.authorBio}
				</p>
			</div>
		</section>
	);
}
