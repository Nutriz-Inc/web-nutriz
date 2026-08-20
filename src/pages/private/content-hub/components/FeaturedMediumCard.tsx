import { useNavigate } from "react-router-dom";
import { InteractiveCard } from "@/components/full/InteractiveCard";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/pages/public/articles/data";
import { ArticleCover } from "./ArticleCover";

type FeaturedMediumCardProps = {
	article: Article;
};

export function FeaturedMediumCard({ article }: FeaturedMediumCardProps) {
	const navigate = useNavigate();

	return (
		<InteractiveCard
			onClick={() => navigate(`/artigos?a=${article.id}`)}
			className="flex flex-col overflow-hidden rounded-card-sm border border-line bg-white shadow-soft"
		>
			<ArticleCover article={article} className="h-[100px]" />

			<div className="flex flex-col gap-2 p-4">
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

				<span className="text-[11px] text-ink-2">
					{article.readTimeMinutes} min de leitura
				</span>
			</div>
		</InteractiveCard>
	);
}
