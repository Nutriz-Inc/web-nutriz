import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
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
		<div className="min-h-dvh bg-canvas font-body [&_button]:cursor-pointer">
			<AppHeader />

			<div className="mx-auto w-full max-w-[1100px] px-5 py-6 lg:px-8 lg:py-8">
				<Page>
					<Link
						to={isAuthenticated ? "/conteudo-educativo" : "/"}
						className="mb-4 inline-flex h-11 w-fit items-center gap-1.5 rounded-full border border-line bg-surface px-5 text-[14px] font-semibold text-blue-deep outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50"
					>
						<ChevronLeft className="size-4" aria-hidden="true" />
						{isAuthenticated ? "Voltar para conteúdos" : "Voltar para o início"}
					</Link>

					<main
						id="conteudo"
						tabIndex={-1}
						className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_320px] lg:items-start"
					>
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
