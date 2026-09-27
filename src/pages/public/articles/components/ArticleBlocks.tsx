import type { Article } from "../data";
import { blockKey, headingId } from "../utils";

type ArticleBlocksProps = {
	article: Article;
};

export function ArticleBlocks({ article }: ArticleBlocksProps) {
	return (
		<div className="flex flex-col text-corpo leading-[1.8] text-ink-2">
			{article.blocks.map((block, indice) => {
				if ("h" in block) {
					return (
						<h2
							key={blockKey(block)}
							id={headingId(block.h)}
							tabIndex={-1}
							className="mt-12 mb-1 scroll-mt-24 font-display text-secao font-bold leading-tight tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-deep"
						>
							{block.h}
						</h2>
					);
				}

				if ("p" in block) {
					return (
						<p
							key={blockKey(block)}
							className={
								indice === 0 ? "text-destaque leading-[1.7] text-ink" : "mt-4"
							}
						>
							{block.p}
						</p>
					);
				}

				if ("list" in block) {
					return (
						<ul key={blockKey(block)} className="mt-4 flex flex-col gap-2">
							{block.list.map((item) => (
								<li key={item} className="flex gap-3">
									<span
										aria-hidden="true"
										className="mt-[0.85em] h-px w-4 shrink-0 bg-blue-bright"
									/>
									{item}
								</li>
							))}
						</ul>
					);
				}

				return (
					<aside
						key={blockKey(block)}
						className="my-6 border-l-2 border-blue-bright py-1 pl-5"
					>
						<p className="font-display text-destaque font-semibold leading-snug text-ink">
							{block.callout}
						</p>
					</aside>
				);
			})}
		</div>
	);
}
