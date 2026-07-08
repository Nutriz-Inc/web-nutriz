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

export type Stat = {
	target: number;
	prefix?: string;
	suffix?: string;
	format?: "thousands";
	label: string;
	color: string;
};

export const STATS: Stat[] = [
	{
		target: 4200,
		suffix: "+",
		format: "thousands",
		label: "Doadoras ativas",
		color: "#ec4899",
	},
	{
		target: 12,
		suffix: " mil L",
		label: "Leite coletado",
		color: "#f9a620",
	},
	{
		target: 98,
		suffix: "%",
		label: "Satisfação",
		color: "#10b981",
	},
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
		color: "#3b82f6",
	},
	{
		number: "2",
		title: "Realize os exames",
		description:
			"Exames simples de saúde para garantir a segurança do leite para os bebês receptores.",
		color: "#f9a620",
	},
	{
		number: "3",
		title: "Doe e acompanhe",
		description:
			"Coletamos o leite e você acompanha cada etapa pela plataforma em tempo real.",
		color: "#ec4899",
	},
];

export type PointTagTone = "open" | "closed" | "donation" | "pickup";

export type PointTag = {
	label: string;
	tone: PointTagTone;
};

export type CollectionPoint = {
	id: string;
	name: string;
	address: string;
	distance: string;
	tags: PointTag[];
};

export const COLLECTION_POINTS: CollectionPoint[] = [
	{
		id: "santa-casa-1",
		name: "BLH Santa Casa SP",
		address: "R. Dr. Cesário Motta Jr., 112",
		distance: "0,8 km",
		tags: [
			{ label: "Aberto", tone: "open" },
			{ label: "Retirada", tone: "pickup" },
		],
	},
	{
		id: "santa-casa-2",
		name: "BLH Santa Casa SP",
		address: "R. Dr. Cesário Motta Jr., 112",
		distance: "0,8 km",
		tags: [
			{ label: "Aberto", tone: "open" },
			{ label: "Doação", tone: "donation" },
			{ label: "Retirada", tone: "pickup" },
		],
	},
	{
		id: "santa-casa-3",
		name: "BLH Santa Casa SP",
		address: "R. Dr. Cesário Motta Jr., 112",
		distance: "0,8 km",
		tags: [
			{ label: "Fechado", tone: "closed" },
			{ label: "Doação", tone: "donation" },
		],
	},
	{
		id: "santa-casa-4",
		name: "BLH Santa Casa SP",
		address: "R. Dr. Cesário Motta Jr., 112",
		distance: "0,6 km",
		tags: [
			{ label: "Aberto", tone: "open" },
			{ label: "Doação", tone: "donation" },
			{ label: "Retirada", tone: "pickup" },
		],
	},
];

export const POINT_FILTERS = [
	"Todos",
	"Aberto",
	"Mais Próximo",
	"Coleta Domiciliar",
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
