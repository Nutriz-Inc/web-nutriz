import { ArrowUpRight } from "lucide-react";
import { ARTICLES, type Article } from "../data";
import { ItemDeLeitura } from "./ItemDeLeitura";

type ContinueLendoProps = {
	article: Article;
	onSelectArticle: (id: number) => void;
};

export function ContinueLendo({
	article,
	onSelectArticle,
}: ContinueLendoProps) {
	const outros = ARTICLES.filter((item) => item.id !== article.id);
	const [destaque, ...demais] = outros;

	if (!destaque) {
		return null;
	}

	return (
		<section aria-labelledby="continue-lendo" className="flex flex-col gap-6">
			<h2
				id="continue-lendo"
				className="font-display text-titulo font-bold tracking-tight text-blue-deep"
			>
				Continue lendo
			</h2>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
				<button
					type="button"
					onClick={() => onSelectArticle(destaque.id)}
					className="group flex flex-col gap-4 text-left"
				>
					<span className="relative block overflow-hidden rounded-card bg-surface-3">
						<img
							src={destaque.coverImage}
							alt=""
							aria-hidden="true"
							width={destaque.coverWidth}
							height={destaque.coverHeight}
							className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
						/>
						<span
							aria-hidden="true"
							className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-surface text-blue-deep opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100"
						>
							<ArrowUpRight className="size-4" />
						</span>
					</span>
					<span className="flex flex-col gap-2">
						<span className="text-rotulo font-semibold uppercase tracking-[0.12em] text-blue-bright">
							{destaque.category} · {destaque.readTimeMinutes} min
						</span>
						<span className="max-w-[26ch] font-display text-secao font-bold leading-tight tracking-tight text-ink transition-colors duration-150 group-hover:text-blue-deep">
							{destaque.title}
						</span>
					</span>
				</button>

				<ul className="flex flex-col border-b border-line">
					{demais.map((item) => (
						<li key={item.id}>
							<ItemDeLeitura
								article={item}
								onAbrir={() => onSelectArticle(item.id)}
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
