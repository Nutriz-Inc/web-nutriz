import { useNavigate } from "react-router-dom";
import { InteractiveCard } from "@/components/full/InteractiveCard";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/pages/public/articles/data";
import { getArticleSummary } from "../utils";
import { ArticleCover } from "./ArticleCover";

type FeaturedMainCardProps = {
	article: Article;
};

export function FeaturedMainCard({ article }: FeaturedMainCardProps) {
	const navigate = useNavigate();

	function goToArticle() {
		navigate(`/artigos?a=${article.id}`);
	}

	return (
		<InteractiveCard
			onClick={goToArticle}
			className="flex flex-col overflow-hidden rounded-card-sm border border-line bg-surface shadow-soft"
		>
			<ArticleCover article={article} className="h-[220px]" />

			<div className="flex flex-1 flex-col gap-3 p-6">
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

				<h2 className="text-[22px] font-bold leading-snug text-ink">
					{article.title}
				</h2>

				<p className="line-clamp-2 text-[14px] leading-relaxed text-ink-2">
					{getArticleSummary(article)}
				</p>

				<div className="mt-1 flex items-center justify-between">
					<span className="flex items-center gap-2 text-[13px] text-ink-2">
						<span
							aria-hidden
							className="flex size-[26px] items-center justify-center rounded-full text-[10px] font-bold"
							style={{ backgroundColor: article.soft, color: article.accent }}
						>
							{article.authorInitials}
						</span>
						<span className="font-semibold text-ink-2">{article.author}</span>
					</span>

					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							goToArticle();
						}}
						className="text-[13px] font-semibold"
						style={{ color: article.accent }}
					>
						Ler artigo →
					</button>
				</div>
			</div>
		</InteractiveCard>
	);
}
