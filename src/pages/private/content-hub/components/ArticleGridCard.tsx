import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Article } from "@/pages/public/articles/data";
import { getArticleSummary } from "../utils";
import { ArticleCover } from "./ArticleCover";

type ArticleGridCardProps = {
	article: Article;
};

export function ArticleGridCard({ article }: ArticleGridCardProps) {
	const navigate = useNavigate();

	return (
		<motion.article
			whileHover={{ y: -3 }}
			transition={{ type: "spring", stiffness: 300, damping: 22 }}
			onClick={() => navigate(`/artigos?a=${article.id}`)}
			className="flex cursor-pointer gap-4 rounded-xl border border-[#e4e4e7] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
		>
			<ArticleCover
				article={article}
				className="size-[72px] shrink-0 rounded-lg"
			/>

			<div className="flex min-w-0 flex-col gap-1.5">
				<span
					className="w-fit rounded-full border px-2 py-0.5 text-[10.5px] font-semibold"
					style={{
						backgroundColor: article.soft,
						borderColor: article.softBorder,
						color: article.accent,
					}}
				>
					{article.category}
				</span>

				<h3 className="text-[14.5px] font-bold leading-snug text-[#09090b]">
					{article.title}
				</h3>

				<p className="line-clamp-2 text-[12.5px] leading-relaxed text-[#71717a]">
					{getArticleSummary(article)}
				</p>

				<span className="text-[11.5px] text-[#a1a1aa]">
					{article.readTimeMinutes} min de leitura
				</span>
			</div>
		</motion.article>
	);
}
