import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticleById } from "@/data/articles";
import { ArticleCard } from "./components/ArticleCard";
import { ArticlesHeader } from "./components/ArticlesHeader";
import { DonateCta } from "./components/sidebar/DonateCta";
import { RelatedCard } from "./components/sidebar/RelatedCard";
import { ShareCard } from "./components/sidebar/ShareCard";
import { StatsCard } from "./components/sidebar/StatsCard";
import { TocCard } from "./components/sidebar/TocCard";

export function ArticlesScreen() {
	const [searchParams, setSearchParams] = useSearchParams();
	const article = getArticleById(Number(searchParams.get("a")));

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, []);

	function handleSelectArticle(id: number) {
		setSearchParams({ a: String(id) });
		window.scrollTo({ top: 0, behavior: "instant" });
	}

	return (
		<div className="min-h-screen bg-[#eef2f7] [&_button]:cursor-pointer">
			<ArticlesHeader onSelectArticle={handleSelectArticle} />

			<main className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-5 py-6 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:px-8 lg:py-8">
				<article>
					<ArticleCard article={article} />
				</article>

				<aside
					aria-label="Complementos do artigo"
					className="flex flex-col gap-5"
				>
					<div className="lg:order-2">
						<TocCard article={article} />
					</div>
					<div className="lg:order-4">
						<RelatedCard
							article={article}
							onSelectArticle={handleSelectArticle}
						/>
					</div>
					<div className="lg:order-5">
						<DonateCta />
					</div>
					<div className="lg:order-1">
						<ShareCard />
					</div>
					<div className="lg:order-3">
						<StatsCard />
					</div>
				</aside>
			</main>
		</div>
	);
}
