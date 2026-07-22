import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ArticleCard } from "./components/ArticleCard";
import { DonateCta } from "./components/DonateCta";
import { RelatedCard } from "./components/RelatedCard";
import { StatsCard } from "./components/StatsCard";
import { TocCard } from "./components/TocCard";
import { getArticleById } from "./data";

export function ArticlesScreen() {
	const [searchParams, setSearchParams] = useSearchParams();
	const shouldReduceMotion = useReducedMotion();
	const { isAuthenticated } = useAuth();
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
			<div className="mx-auto w-full max-w-[1100px] px-5 py-6 lg:px-8 lg:py-8">
				<Page backTo={isAuthenticated ? "/conteudo-educativo" : "/"}>
					<main className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_320px] lg:items-start">
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
							<motion.div variants={sidebarItem} className="lg:order-1">
								<TocCard article={article} />
							</motion.div>
							<motion.div variants={sidebarItem} className="lg:order-2">
								<StatsCard />
							</motion.div>
							<motion.div variants={sidebarItem} className="lg:order-3">
								<RelatedCard
									article={article}
									onSelectArticle={handleSelectArticle}
								/>
							</motion.div>
							<motion.div variants={sidebarItem} className="lg:order-4">
								<DonateCta />
							</motion.div>
						</motion.aside>
					</main>
				</Page>
			</div>
		</div>
	);
}
