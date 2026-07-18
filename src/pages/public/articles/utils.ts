import type { Article } from "@/data/articles";

export function normalizeText(text: string) {
	return text.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

export function headingId(text: string) {
	return `secao-${normalizeText(text).replace(/[^a-z0-9]+/g, "-")}`;
}

export function getHeadings(article: Article) {
	return article.blocks.flatMap((block) => ("h" in block ? [block.h] : []));
}
