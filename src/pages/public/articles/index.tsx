import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EASE_OUT } from "@/lib/easing";
import { ArticleBlocks } from "./components/ArticleBlocks";
import { AutoraDoArtigo } from "./components/AutoraDoArtigo";
import { CabecalhoDoArtigo } from "./components/CabecalhoDoArtigo";
import { ContinueLendo } from "./components/ContinueLendo";
import { IndiceDoArtigo } from "./components/IndiceDoArtigo";
import { NumerosDaDoacao } from "./components/NumerosDaDoacao";
import { ProgressoDeLeitura } from "./components/ProgressoDeLeitura";
import { ResumoDoArtigo } from "./components/ResumoDoArtigo";
import { VideoSection } from "./components/VideoSection";
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
				exit: { opacity: 0, y: -8 },
				transition: { duration: 0.45, ease: EASE_OUT },
			};

	return (
		<div className="flex min-h-dvh flex-col bg-canvas font-body [&_button]:cursor-pointer">
			<ProgressoDeLeitura />
			<AppHeader />

			<div className="mx-auto w-full max-w-[1200px] grow px-5 pt-6 pb-20 sm:px-6 lg:px-8 lg:pt-10 lg:pb-28">
				<Page>
					{isAuthenticated ? null : (
						<Link
							to="/"
							className="group inline-flex w-fit items-center gap-2 rounded-full py-2 text-apoio font-semibold text-ink-2 outline-none transition-colors hover:text-blue-deep focus-visible:ring-3 focus-visible:ring-blue-bright/50"
						>
							<ArrowLeft
								className="size-4 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
								aria-hidden="true"
							/>
							Início
						</Link>
					)}

					<main id="conteudo" tabIndex={-1} className="mt-6 lg:mt-8">
						<AnimatePresence mode="wait">
							<motion.article key={article.id} {...articleSwap}>
								<CabecalhoDoArtigo article={article} />

								<div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-16">
									<aside className="hidden lg:block">
										<div className="sticky top-24">
											<IndiceDoArtigo article={article} />
										</div>
									</aside>

									<div className="flex max-w-[68ch] flex-col gap-14">
										<ResumoDoArtigo article={article} />
										<ArticleBlocks article={article} />
										<VideoSection article={article} />
										<AutoraDoArtigo article={article} />
									</div>
								</div>
							</motion.article>
						</AnimatePresence>

						<div className="mt-20 flex flex-col gap-20 border-t border-line pt-14 lg:mt-24">
							<NumerosDaDoacao />
							<ContinueLendo
								article={article}
								onSelectArticle={handleSelectArticle}
							/>
						</div>
					</main>
				</Page>
			</div>
			<Footer />
		</div>
	);
}
