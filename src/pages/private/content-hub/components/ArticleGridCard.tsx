import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
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
			className="flex cursor-pointer gap-4 rounded-card-sm border border-line bg-white p-4 shadow-soft"
		>
			<ArticleCover
				article={article}
				className="size-[72px] shrink-0 rounded-lg"
			/>

			<div className="flex min-w-0 flex-col gap-1.5">
				<Badge
					size="sm"
					bordered
					style={{
						backgroundColor: article.soft,
						borderColor: article.softBorder,
						color: article.accent,
					}}
				>
					{article.category}
				</Badge>

				<h3 className="text-[14px] font-bold leading-snug text-ink">
					{article.title}
				</h3>

				<p className="line-clamp-2 text-[12px] leading-relaxed text-ink-2">
					{getArticleSummary(article)}
				</p>

				<span className="text-[11px] text-ink-3">
					{article.readTimeMinutes} min de leitura
				</span>
			</div>
		</motion.article>
	);
}
