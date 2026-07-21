import type { Article } from "@/pages/public/articles/data";

export function getArticleSummary(article: Article) {
	const firstParagraph = article.blocks.find((block) => "p" in block);
	return firstParagraph && "p" in firstParagraph ? firstParagraph.p : "";
}
