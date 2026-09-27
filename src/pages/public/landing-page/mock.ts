import { ARTICLES as SHARED_ARTICLES } from "@/pages/public/articles/data";

export type Article = {
	id: number;
	category: string;
	categoryColor: string;
	accent: string;
	title: string;
	readTime: string;
	coverImage: string;
	coverAlt: string;
	coverWidth: number;
	coverHeight: number;
};

const COR_DA_CATEGORIA = {
	categoryColor: "var(--blue)",
	accent: "var(--blue-tint)",
};

export const ARTICLES: Article[] = SHARED_ARTICLES.slice(0, 4).map(
	(article) => ({
		id: article.id,
		category: article.category,
		title: article.title,
		readTime: `${article.readTimeMinutes} min de leitura`,
		coverImage: article.coverImage,
		coverAlt: article.coverAlt,
		coverWidth: article.coverWidth,
		coverHeight: article.coverHeight,
		...COR_DA_CATEGORIA,
	}),
);

export type Testimonial = {
	name: string;
	since: string;
	text: string;
};

export const TESTIMONIALS: Testimonial[] = [
	{
		name: "Ana Paula S.",
		since: "Doadora há 8 meses",
		text: "Achei que seria complicado, mas a equipe do Nutriz me guiou em cada etapa. Saber que meu leite alimentou um bebê na UTI me encheu de propósito.",
	},
	{
		name: "Mariana L.",
		since: "Doadora há 4 meses",
		text: "A EVA me respondeu às 3h da manhã quando eu tinha dúvidas sobre armazenamento. Isso fez toda a diferença para eu continuar doando.",
	},
];
