import type { Article } from "../data";

type ItemDeLeituraProps = {
	article: Article;
	onAbrir: () => void;
};

export function ItemDeLeitura({ article, onAbrir }: ItemDeLeituraProps) {
	return (
		<button
			type="button"
			onClick={onAbrir}
			className="group flex w-full items-center gap-4 border-t border-line py-4 text-left"
		>
			<span className="size-16 shrink-0 overflow-hidden rounded-xl bg-surface-3">
				<img
					src={article.coverImage}
					alt=""
					aria-hidden="true"
					width={article.coverWidth}
					height={article.coverHeight}
					className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
				/>
			</span>
			<span className="flex min-w-0 flex-col gap-1">
				<span className="text-rotulo font-semibold uppercase tracking-[0.12em] text-blue-bright">
					{article.category}
				</span>
				<span className="text-apoio font-semibold leading-snug text-ink transition-colors duration-150 group-hover:text-blue-deep">
					{article.title}
				</span>
				<span className="text-rotulo text-ink-3">
					{article.readTimeMinutes} min de leitura
				</span>
			</span>
		</button>
	);
}
