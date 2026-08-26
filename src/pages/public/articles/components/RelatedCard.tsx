import { ARTICLES, type Article } from "../data";

type RelatedCardProps = {
	article: Article;
	onSelectArticle: (id: number) => void;
};

export function RelatedCard({ article, onSelectArticle }: RelatedCardProps) {
	const others = ARTICLES.filter((item) => item.id !== article.id);

	return (
		<section className="rounded-card-sm border border-line bg-surface p-5 shadow-soft">
			<h2 className="text-[15px] font-bold text-ink">Outros artigos</h2>
			<ul className="mt-3 flex flex-col gap-1">
				{others.map((item) => (
					<li key={item.id}>
						<button
							type="button"
							onClick={() => onSelectArticle(item.id)}
							className="flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors duration-150 hover:bg-surface-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-deep"
						>
							<img
								src={item.coverImage}
								alt=""
								aria-hidden
								width={item.coverWidth}
								height={item.coverHeight}
								className="size-11 shrink-0 rounded-lg object-cover"
							/>
							<span className="flex flex-col gap-0.5">
								<span className="text-[13px] font-semibold leading-snug text-ink">
									{item.title}
								</span>
								<span className="text-[11px] text-ink-2">
									{item.category} · {item.readTimeMinutes} min
								</span>
							</span>
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}
