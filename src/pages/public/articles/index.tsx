import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ArticleCard } from "./components/ArticleCard";
import { ArticlesHeader } from "./components/ArticlesHeader";
import { DonateCta } from "./components/DonateCta";
import { RelatedCard } from "./components/RelatedCard";
import { ShareCard } from "./components/ShareCard";
import { StatsCard } from "./components/StatsCard";
import { TocCard } from "./components/TocCard";
import { getArticleById } from "./data";

export function ArticlesScreen() {
	const [searchParams, setSearchParams] = useSearchParams();
	const shouldReduceMotion = useReducedMotion();
	const article = getArticleById(Number(searchParams.get("a")));

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, []);

	function handleSelectArticle(id: number) {
		setSearchParams({ a: String(id) });
		window.scrollTo({ top: 0, behavior: "instant" });
	}

	const articleSwap = shouldReduceMotion
		? {}
		: {
				initial: { opacity: 0, y: 14 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 14 },
				transition: { duration: 0.45, ease: "easeOut" as const },
			};

	const sidebarReveal = shouldReduceMotion
		? {}
		: {
				variants: staggerContainer,
				initial: "hidden",
				animate: "show",
			};

	const sidebarItem = shouldReduceMotion ? undefined : fadeUp;

	return (
		<div className="min-h-screen bg-[#eef2f7] [&_button]:cursor-pointer">
			<ArticlesHeader onSelectArticle={handleSelectArticle} />

			<main className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-5 py-6 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:px-8 lg:py-8">
				<article>
					<AnimatePresence mode="wait">
						<motion.div key={article.id} {...articleSwap}>
							<ArticleCard article={article} />
						</motion.div>
					</AnimatePresence>
				</article>

				<motion.aside
					{...sidebarReveal}
					aria-label="Complementos do artigo"
					className="flex flex-col gap-5"
				>
					<motion.div variants={sidebarItem} className="lg:order-2">
						<TocCard article={article} />
					</motion.div>
					<motion.div variants={sidebarItem} className="lg:order-4">
						<RelatedCard
							article={article}
							onSelectArticle={handleSelectArticle}
						/>
					</motion.div>
					<motion.div variants={sidebarItem} className="lg:order-5">
						<DonateCta />
					</motion.div>
					<motion.div variants={sidebarItem} className="lg:order-1">
						<ShareCard />
					</motion.div>
					<motion.div variants={sidebarItem} className="lg:order-3">
						<StatsCard />
					</motion.div>
				</motion.aside>
			</main>
		</div>
	);
}
