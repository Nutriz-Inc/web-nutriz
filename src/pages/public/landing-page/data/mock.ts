export type Article = {
	category: string;
	categoryColor: string;
	accent: string;
	title: string;
	readTime: string;
};

export const ARTICLES: Article[] = [
	{
		category: "Amamentação",
		categoryColor: "#0f9d8c",
		accent: "#d7f2ec",
		title: "Como armazenar e transportar seu leite com segurança",
		readTime: "4 min de leitura",
	},
	{
		category: "Nutrição",
		categoryColor: "#3f8f2f",
		accent: "#e2f1d6",
		title: "Alimentação da nutriz: o que comer durante a doação",
		readTime: "5 min de leitura",
	},
	{
		category: "Acolhimento",
		categoryColor: "#d84e83",
		accent: "#fbdce8",
		title: "Não pôde doar? Veja como você ainda pode ajudar",
		readTime: "3 min de leitura",
	},
	{
		category: "Cuidados",
		categoryColor: "#3b6fd0",
		accent: "#dbe7fb",
		title: "Higiene na ordenha: passo a passo da rBLH",
		readTime: "6 min de leitura",
	},
];

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
