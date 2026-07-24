import { cn } from "@/lib/utils";
import type { Article } from "@/pages/public/articles/data";

type ArticleCoverProps = {
	article: Article;
	className?: string;
};

export function ArticleCover({ article, className }: ArticleCoverProps) {
	return (
		<img
			src={article.coverImage}
			alt={article.coverAlt}
			width={article.coverWidth}
			height={article.coverHeight}
			className={cn("w-full object-cover", className)}
		/>
	);
}
