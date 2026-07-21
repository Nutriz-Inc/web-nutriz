import {
	type ArticleCategory,
	ARTICLES as SHARED_ARTICLES,
} from "@/data/articles";

export type Article = {
	id: number;
	category: string;
	categoryColor: string;
	accent: string;
	title: string;
	readTime: string;
};

const LANDING_ARTICLE_COLORS: Record<
	ArticleCategory,
	{ categoryColor: string; accent: string }
> = {
	Amamentação: { categoryColor: "#0f9d8c", accent: "#d7f2ec" },
	Nutrição: { categoryColor: "#3f8f2f", accent: "#e2f1d6" },
	Acolhimento: { categoryColor: "#d84e83", accent: "#fbdce8" },
	Cuidados: { categoryColor: "#3b6fd0", accent: "#dbe7fb" },
};

// A landing mostra só um teaser de 4 artigos (grid lg:grid-cols-4) — o
// catálogo completo (agora com mais conteúdos) fica na Central de
// Conteúdos, área logada. Os 4 primeiros são os originais da spec.
export const ARTICLES: Article[] = SHARED_ARTICLES.slice(0, 4).map(
	(article) => ({
		id: article.id,
		category: article.category,
		title: article.title,
		readTime: `${article.readTimeMinutes} min de leitura`,
		...LANDING_ARTICLE_COLORS[article.category],
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
