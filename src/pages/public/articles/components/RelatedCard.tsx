import { ARTICLES, type Article } from "../data";

type RelatedCardProps = {
	article: Article;
	onSelectArticle: (id: number) => void;
};

export function RelatedCard({ article, onSelectArticle }: RelatedCardProps) {
	const others = ARTICLES.filter((item) => item.id !== article.id);

	return (
		<section className="rounded-xl border border-[#e4e4e7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
			<h2 className="text-[15px] font-bold text-[#09090b]">Outros artigos</h2>
			<ul className="mt-3 flex flex-col gap-1">
				{others.map((item) => (
					<li key={item.id}>
						<button
							type="button"
							onClick={() => onSelectArticle(item.id)}
							className="flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors duration-150 hover:bg-[#f4f6f9] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0d3b6e]"
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
								<span className="text-[13px] font-semibold leading-snug text-[#09090b]">
									{item.title}
								</span>
								<span className="text-[11.5px] text-[#71717a]">
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
