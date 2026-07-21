import { cn } from "@/lib/utils";
import type { Article } from "@/pages/public/articles/data";

type ArticleCoverPlaceholderProps = {
	article: Article;
	className?: string;
};

export function ArticleCoverPlaceholder({
	article,
	className,
}: ArticleCoverPlaceholderProps) {
	return (
		<div
			className={cn("flex items-center justify-center", className)}
			style={{ backgroundColor: article.soft }}
			role="img"
			aria-label={`Imagem do artigo ${article.title}`}
		>
			<span
				className="text-[12px] font-medium"
				style={{ color: article.accent }}
			>
				Imagem do artigo
			</span>
		</div>
	);
}
