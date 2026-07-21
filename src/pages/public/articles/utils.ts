import type { Article, ArticleBlock } from "@/data/articles";

export function blockKey(block: ArticleBlock) {
	if ("h" in block) return `h-${block.h}`;
	if ("p" in block) return `p-${block.p.slice(0, 40)}`;
	if ("list" in block) return `list-${block.list[0]}`;
	return `callout-${block.callout.slice(0, 40)}`;
}

export function normalizeText(text: string) {
	return text.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

export function headingId(text: string) {
	return `secao-${normalizeText(text).replace(/[^a-z0-9]+/g, "-")}`;
}

export function getHeadings(article: Article) {
	return article.blocks.flatMap((block) => ("h" in block ? [block.h] : []));
}
