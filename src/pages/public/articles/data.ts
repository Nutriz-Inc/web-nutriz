export type ArticleBlock =
	| { h: string }
	| { p: string }
	| { list: string[] }
	| { callout: string };

export type ArticleCategory =
	| "Amamentação"
	| "Nutrição"
	| "Acolhimento"
	| "Cuidados";

export type Article = {
	id: number;
	category: ArticleCategory;
	accent: string;
	soft: string;
	softBorder: string;
	title: string;
	author: string;
	authorInitials: string;
	authorBio: string;
	date: string;
	readTimeMinutes: number;
	takeaways: string[];
	videoTitle: string;
	videoDuration: string;
	blocks: ArticleBlock[];
};

export const ARTICLES: Article[] = [
	{
		id: 1,
		category: "Amamentação",
		accent: "#14b8a6",
		soft: "#ccfbf1",
		softBorder: "#99f6e4",
		title: "Como armazenar e transportar seu leite com segurança",
		author: "Dra. Mariana Costa",
		authorInitials: "MC",
		authorBio:
			"Pediatra e consultora em aleitamento materno, colaboradora da Rede Brasileira de Bancos de Leite Humano há 12 anos.",
		date: "12 de julho, 2026",
		readTimeMinutes: 4,
		takeaways: [
			"Qual frasco usar e como esterilizar",
			"Prazos de congelamento do leite cru",
			"Como completar o frasco em coletas diferentes",
			"Transporte seguro até o banco de leite",
		],
		videoTitle: "Como preparar e esterilizar o frasco de coleta",
		videoDuration: "3:42",
		blocks: [
			{
				p: "Armazenar o leite materno corretamente é essencial para preservar seus nutrientes e garantir que ele chegue em segurança aos bebês que precisam. A boa notícia: com poucos cuidados, o processo é simples e pode fazer parte da sua rotina.",
			},
			{ h: "O frasco ideal" },
			{
				p: "Use sempre frascos de vidro com tampa plástica rosqueável — como potes de café solúvel ou maionese. Eles devem ser esterilizados antes do uso: ferva o vidro e a tampa por 15 minutos e deixe secar naturalmente sobre um pano limpo.",
			},
			{
				list: [
					"Vidro com boca larga e tampa plástica",
					"Ferva por 15 minutos para esterilizar",
					"Seque de boca para baixo, sem esfregar",
					"Identifique com data e hora da primeira coleta",
				],
			},
			{ h: "Congelamento e prazos" },
			{
				p: "Após a coleta, leve o frasco imediatamente ao freezer. O leite cru congelado pode ser armazenado por até 15 dias. Você pode completar o mesmo frasco em coletas diferentes do mesmo dia, desde que o leite novo seja resfriado antes.",
			},
			{
				callout:
					"Importante: nunca armazene o leite na porta da geladeira ou do freezer — a variação de temperatura compromete a qualidade.",
			},
			{ h: "O transporte até o banco de leite" },
			{
				p: "O transporte deve ser feito em caixa térmica com gelo. Muitos bancos de leite oferecem busca domiciliar — consulte o posto de coleta mais próximo. O importante é que o leite não descongele no caminho.",
			},
		],
	},
	{
		id: 2,
		category: "Nutrição",
		accent: "#65a30d",
		soft: "#ecfccb",
		softBorder: "#d9f99d",
		title: "Alimentação da nutriz: o que comer durante a doação",
		author: "Carla Menezes",
		authorInitials: "CM",
		authorBio:
			"Nutricionista materno-infantil, atua com orientação alimentar de gestantes e lactantes na rede pública há 9 anos.",
		date: "8 de julho, 2026",
		readTimeMinutes: 5,
		takeaways: [
			"Como montar um prato variado no dia a dia",
			"Por que a hidratação é tão importante",
			"Mitos comuns sobre alimentação e leite",
			"Quando procurar orientação profissional",
		],
		videoTitle: "O prato ideal da nutriz na prática",
		videoDuration: "5:10",
		blocks: [
			{
				p: "Durante o período de doação, a alimentação da nutriz não precisa ser restritiva nem cheia de regras. O mais importante é manter uma rotina alimentar variada e beber bastante água ao longo do dia.",
			},
			{ h: "Um prato variado e colorido" },
			{
				p: "Prefira refeições com arroz, feijão, legumes, verduras e uma fonte de proteína. Frutas ao longo do dia completam as vitaminas e os minerais de que o corpo precisa nessa fase.",
			},
			{ h: "Hidratação em primeiro lugar" },
			{
				p: "A produção de leite aumenta a necessidade de líquidos. Tenha uma garrafa de água por perto e beba sempre que sentir sede — o ideal é não esperar a sede apertar.",
			},
			{
				list: [
					"Beba água ao longo de todo o dia",
					"Evite dietas restritivas por conta própria",
					"Não é preciso comer por dois — coma com qualidade",
					"Café e chás com cafeína pedem moderação",
				],
			},
			{ h: "Mitos e dúvidas comuns" },
			{
				p: "Nenhum alimento específico aumenta ou diminui o leite por si só. Desconfie de receitas milagrosas e, em caso de dúvida, converse com o banco de leite ou com um profissional de saúde.",
			},
			{
				callout:
					"Cada corpo é único: orientações individualizadas devem sempre vir de um profissional de saúde que acompanha você.",
			},
		],
	},
	{
		id: 3,
		category: "Acolhimento",
		accent: "#e0457a",
		soft: "#fdf1f5",
		softBorder: "#fadbe7",
		title: "Não pôde doar? Veja como você ainda pode ajudar",
		author: "Juliana Prado",
		authorInitials: "JP",
		authorBio:
			"Psicóloga perinatal, acompanha famílias no pós-parto e atua como voluntária em campanhas de doação de leite humano.",
		date: "5 de julho, 2026",
		readTimeMinutes: 3,
		takeaways: [
			"Por que nem toda mulher pode doar",
			"Formas de apoiar sem doar leite",
			"Como divulgar a causa na sua rede",
			"Onde entregar frascos de vidro",
		],
		videoTitle: "Histórias de quem apoia a rede de doação",
		videoDuration: "4:05",
		blocks: [
			{
				p: "Nem todas as mulheres podem doar leite, e está tudo bem. Existem muitas outras formas de fortalecer a rede de doação e ajudar bebês que dependem dos bancos de leite.",
			},
			{ h: "Doe frascos de vidro" },
			{
				p: "Os bancos de leite precisam constantemente de frascos de vidro com tampa plástica, como os de café solúvel. Higienize os frascos e entregue no posto de coleta mais próximo.",
			},
			{ h: "Espalhe a informação" },
			{
				list: [
					"Compartilhe conteúdos confiáveis sobre doação",
					"Converse com amigas que estão amamentando",
					"Siga e divulgue o banco de leite da sua região",
					"Participe de campanhas locais de arrecadação",
				],
			},
			{ h: "Ofereça apoio a quem doa" },
			{
				p: "Apoiar uma doadora no dia a dia — na rotina da casa, nos cuidados com o bebê ou apenas ouvindo — também é uma forma real de contribuir com a rede.",
			},
			{
				callout:
					"Toda ajuda conta: a rede de doação se sustenta com doadoras, voluntários e com quem divulga a causa.",
			},
		],
	},
	{
		id: 4,
		category: "Cuidados",
		accent: "#3b82f6",
		soft: "#dbeafe",
		softBorder: "#bfdbfe",
		title: "Higiene na ordenha: passo a passo da rBLH",
		author: "Renata Lima",
		authorInitials: "RL",
		authorBio:
			"Enfermeira obstétrica, integra equipes de coleta domiciliar de leite humano e capacita novas doadoras pela rBLH.",
		date: "10 de julho, 2026",
		readTimeMinutes: 6,
		takeaways: [
			"Como se preparar antes da ordenha",
			"Higiene das mãos e dos utensílios",
			"O que fazer durante e depois da coleta",
			"Cuidados com o ambiente da ordenha",
		],
		videoTitle: "Ordenha manual passo a passo (demonstração)",
		videoDuration: "6:28",
		blocks: [
			{
				p: "A higiene é a etapa mais importante da ordenha: ela garante que o leite doado chegue seguro aos bebês. O passo a passo recomendado pela rBLH é simples e fácil de incorporar à rotina.",
			},
			{ h: "Antes de começar" },
			{
				p: "Escolha um lugar limpo e tranquilo, prenda os cabelos e cubra-os com uma touca ou lenço. Evite conversar durante a coleta e, se possível, proteja boca e nariz com uma máscara.",
			},
			{ h: "Higiene das mãos e do frasco" },
			{
				list: [
					"Lave mãos e antebraços com água e sabão",
					"Use frasco de vidro esterilizado com tampa plástica",
					"Despreze os primeiros jatos de leite",
					"Não toque na parte interna do frasco ou da tampa",
				],
			},
			{ h: "Durante e depois da coleta" },
			{
				p: "Massageie a mama e faça a ordenha com movimentos suaves. Ao terminar, feche bem o frasco, identifique com data e hora e leve imediatamente ao freezer.",
			},
			{
				callout:
					"Em caso de dúvida sobre a técnica, o banco de leite mais próximo pode orientar você gratuitamente — em muitos casos, por telefone ou WhatsApp.",
			},
		],
	},
];

export function getArticleById(id: number | null): Article {
	return ARTICLES.find((article) => article.id === id) ?? ARTICLES[0];
}
