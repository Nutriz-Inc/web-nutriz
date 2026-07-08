export type NavLink = {
	label: string;
	targetId: string;
};

export const NAV_LINKS: NavLink[] = [
	{ label: "Como funciona", targetId: "como-funciona" },
	{ label: "Pontos de coleta", targetId: "pontos-de-coleta" },
	{ label: "A EVA", targetId: "a-eva" },
	{ label: "Artigos", targetId: "artigos" },
	{ label: "Depoimentos", targetId: "depoimentos" },
];

export type Step = {
	number: string;
	title: string;
	description: string;
	color: string;
};

export const STEPS: Step[] = [
	{
		number: "1",
		title: "Cadastre-se e faça triagem",
		description:
			"Clique em Quero doar e nossa equipe entrará em contato via WhatsApp para a triagem inicial.",
		color: "#00458b",
	},
	{
		number: "2",
		title: "Realize os exames",
		description:
			"Exames simples de saúde para garantir a segurança do leite para os bebês receptores.",
		color: "#0e9e94",
	},
	{
		number: "3",
		title: "Doe e acompanhe",
		description:
			"Coletamos o leite e você acompanha cada etapa pela plataforma em tempo real.",
		color: "#f2579f",
	},
];

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
