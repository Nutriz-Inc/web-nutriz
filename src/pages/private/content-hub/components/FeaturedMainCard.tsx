import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Article } from "@/pages/public/articles/data";
import { getArticleSummary } from "../utils";
import { ArticleCoverPlaceholder } from "./ArticleCoverPlaceholder";

type FeaturedMainCardProps = {
	article: Article;
};

export function FeaturedMainCard({ article }: FeaturedMainCardProps) {
	const navigate = useNavigate();

	function goToArticle() {
		navigate(`/artigos?a=${article.id}`);
	}

	return (
		<motion.article
			whileHover={{ y: -4 }}
			transition={{ type: "spring", stiffness: 300, damping: 22 }}
			onClick={goToArticle}
			className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#e4e4e7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
		>
			<ArticleCoverPlaceholder article={article} className="h-[220px]" />

			<div className="flex flex-1 flex-col gap-3 p-6">
				<span
					className="w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold"
					style={{
						backgroundColor: article.soft,
						borderColor: article.softBorder,
						color: article.accent,
					}}
				>
					{article.category}
				</span>

				<h2 className="text-[22px] font-bold leading-snug text-[#09090b]">
					{article.title}
				</h2>

				<p className="line-clamp-2 text-[14px] leading-relaxed text-[#71717a]">
					{getArticleSummary(article)}
				</p>

				<div className="mt-1 flex items-center justify-between">
					<span className="flex items-center gap-2 text-[13px] text-[#71717a]">
						<span
							aria-hidden
							className="flex size-[26px] items-center justify-center rounded-full text-[10px] font-bold"
							style={{ backgroundColor: article.soft, color: article.accent }}
						>
							{article.authorInitials}
						</span>
						<span className="font-semibold text-[#3f3f46]">
							{article.author}
						</span>
					</span>

					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							goToArticle();
						}}
						className="text-[13.5px] font-semibold"
						style={{ color: article.accent }}
					>
						Ler artigo →
					</button>
				</div>
			</div>
		</motion.article>
	);
}
