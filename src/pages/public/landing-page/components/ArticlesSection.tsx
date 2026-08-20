import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useReveal } from "../hooks/use-reveal";
import { ARTICLES } from "../mock";
import { SectionLabel } from "./SectionLabel";

export function ArticlesSection() {
	const navigate = useNavigate();
	const headerReveal = useReveal();
	const gridReveal = useReveal(staggerContainer);

	return (
		<section
			id="artigos"
			className="relative scroll-mt-20 overflow-hidden bg-blue-deep py-20 lg:py-24"
		>
			<span
				aria-hidden
				className="pointer-events-none absolute -top-24 left-[8%] h-72 w-[55%] rounded-full bg-[#2fd9c5]/12 blur-[130px]"
			/>
			<span
				aria-hidden
				className="pointer-events-none absolute -bottom-24 right-[6%] h-72 w-[55%] rounded-full bg-blue-bright/18 blur-[130px]"
			/>
			<div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 lg:px-8">
				<motion.div
					{...headerReveal}
					className="flex flex-col items-center gap-4 text-center"
				>
					<SectionLabel color="#2fd9c5">CONTEÚDO DE APOIO</SectionLabel>
					<h2 className="max-w-2xl text-[30px] font-extrabold tracking-tight text-white lg:text-[38px]">
						Artigos para te apoiar em cada fase
					</h2>
					<span className="inline-flex items-center gap-1.5 rounded-full bg-success-tint px-3.5 py-1.5 text-[12px] font-semibold text-teal">
						<BadgeCheck className="size-4" />
						Conteúdo validado por rBLH e Fiocruz
					</span>
				</motion.div>

				<motion.div
					{...gridReveal}
					className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
				>
					{ARTICLES.map((article) => (
						<motion.article
							key={article.title}
							variants={fadeUp}
							whileHover={{ y: -6 }}
							transition={{ type: "spring", stiffness: 300, damping: 22 }}
							onClick={() => navigate(`/artigos?a=${article.id}`)}
							className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-blue-tint bg-white shadow-soft"
						>
							<img
								src={article.coverImage}
								alt={article.coverAlt}
								width={article.coverWidth}
								height={article.coverHeight}
								className="h-24 w-full object-cover"
							/>

							<div className="flex flex-1 flex-col gap-3 p-5">
								<Badge
									size="sm"
									style={{
										backgroundColor: `${article.accent}`,
										color: article.categoryColor,
									}}
								>
									{article.category}
								</Badge>

								<h3 className="flex-1 text-[15px] font-bold leading-snug text-ink">
									{article.title}
								</h3>

								<div className="flex items-center justify-between">
									<span className="text-[12px] text-ink-3">
										{article.readTime}
									</span>
									<button
										type="button"
										onClick={(e) => {
											e.stopPropagation();
											navigate(`/artigos?a=${article.id}`);
										}}
										aria-label={`Ler artigo: ${article.title}`}
										className="inline-flex items-center gap-1 rounded-lg text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
										style={{ color: article.categoryColor }}
									>
										Ler artigo
										<ArrowRight className="size-3.5" />
									</button>
								</div>
							</div>
						</motion.article>
					))}
				</motion.div>
			</div>
		</section>
	);
}
