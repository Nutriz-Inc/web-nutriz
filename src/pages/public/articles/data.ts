import alimentacaoNutriz from "@/assets/artigos/alimentacao-nutriz.jpg";
import apoioSemDoar from "@/assets/artigos/apoio-sem-doar.jpg";
import armazenamentoLeite from "@/assets/artigos/armazenamento-leite.jpg";
import diarioDoadora from "@/assets/artigos/diario-doadora.jpg";
import excessoDeLeite from "@/assets/artigos/excesso-de-leite.jpg";
import higieneOrdenha from "@/assets/artigos/higiene-ordenha.jpg";
import nutrientesLactacao from "@/assets/artigos/nutrientes-lactacao.jpg";
import triagemDoacao from "@/assets/artigos/triagem-doacao.jpg";

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
	coverImage: string;
	coverAlt: string;
	coverWidth: number;
	coverHeight: number;
	author: string;
	authorInitials: string;
	authorBio: string;
	date: string;
	readTimeMinutes: number;
	takeaways: string[];
	videoTitle: string;
	videoDuration: string;
	videoUrl?: string;
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
		coverImage: armazenamentoLeite,
		coverAlt: "Frascos de leite materno identificados e organizados em freezer",
		coverWidth: 772,
		coverHeight: 960,
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
		coverImage: alimentacaoNutriz,
		coverAlt: "Mulher segurando bomba manual de extração de leite materno",
		coverWidth: 678,
		coverHeight: 452,
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
		coverImage: apoioSemDoar,
		coverAlt:
			"Profissional de banco de leite segurando dois frascos de leite doado",
		coverWidth: 1100,
		coverHeight: 734,
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
		coverImage: higieneOrdenha,
		coverAlt:
			"Profissional manipulando frascos esterilizados com luvas em capela de fluxo",
		coverWidth: 539,
		coverHeight: 371,
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
	{
		id: 5,
		category: "Amamentação",
		accent: "#14b8a6",
		soft: "#ccfbf1",
		softBorder: "#99f6e4",
		title: "Excesso de leite: transforme o que sobra em doação",
		coverImage: excessoDeLeite,
		coverAlt:
			"Bomba de extração de leite materno com mamadeira, mãe amamentando ao fundo",
		coverWidth: 1200,
		coverHeight: 675,
		author: "Dra. Beatriz Nogueira",
		authorInitials: "BN",
		authorBio:
			"Pediatra e consultora em aleitamento materno, atua em maternidades públicas de São Paulo há 8 anos.",
		date: "16 de julho, 2026",
		readTimeMinutes: 4,
		takeaways: [
			"Sinais de que você produz mais leite do que o bebê precisa",
			"Por que o excedente não deve ser desperdiçado",
			"Como organizar a ordenha do excesso na rotina",
			"O primeiro passo para virar doadora",
		],
		videoTitle: "O que fazer quando sobra leite depois da mamada",
		videoDuration: "3:15",
		blocks: [
			{
				p: "Muitas mães percebem que produzem mais leite do que o bebê consegue mamar — e esse excedente, quando descartado, é uma oportunidade perdida. Transformá-lo em doação é mais simples do que parece.",
			},
			{ h: "Como identificar o excesso" },
			{
				p: "Seios que continuam cheios logo após a mamada, vazamentos frequentes ou desconforto por acúmulo de leite são sinais comuns de produção acima da necessidade do bebê.",
			},
			{
				list: [
					"Desconforto ou peso nos seios após mamar",
					"Vazamentos entre as mamadas",
					"Bebê satisfeito antes de esvaziar a mama",
					"Facilidade para extrair leite extra na ordenha",
				],
			},
			{ h: "Aproveitando o excedente" },
			{
				p: "Em vez de descartar, o leite excedente pode ser coletado com a mesma higiene de uma ordenha normal e destinado à doação, ajudando bebês prematuros ou internados.",
			},
			{
				callout:
					"Antes de doar, é preciso passar por uma triagem simples com o banco de leite — veja o artigo sobre critérios de doação para saber como funciona.",
			},
			{ h: "O primeiro contato com o banco de leite" },
			{
				p: "Basta procurar o posto de coleta mais próximo ou entrar em contato pelo Disque Saúde (136) para iniciar o processo e saber se você pode se tornar doadora.",
			},
		],
	},
	{
		id: 6,
		category: "Cuidados",
		accent: "#3b82f6",
		soft: "#dbeafe",
		softBorder: "#bfdbfe",
		title: "Quem pode doar? Critérios de saúde e triagem",
		coverImage: triagemDoacao,
		coverAlt:
			"Profissional de saúde realizando coleta de sangue para triagem de doadora",
		coverWidth: 962,
		coverHeight: 552,
		author: "Renata Lima",
		authorInitials: "RL",
		authorBio:
			"Enfermeira obstétrica, integra equipes de coleta domiciliar de leite humano e capacita novas doadoras pela rBLH.",
		date: "14 de julho, 2026",
		readTimeMinutes: 5,
		takeaways: [
			"Quem pode se candidatar a doadora",
			"O que é avaliado na triagem inicial",
			"Situações que pedem avaliação médica antes de doar",
			"Como agendar os exames",
		],
		videoTitle: "Como funciona a triagem de uma nova doadora",
		videoDuration: "4:48",
		blocks: [
			{
				p: "Qualquer nutriz saudável, que produza leite além do que o próprio bebê consome, pode se candidatar a doadora. A triagem existe para garantir segurança para quem doa e para quem recebe.",
			},
			{ h: "Quem pode se candidatar" },
			{
				p: "Mulheres em amamentação, com boa saúde geral e sem uso de medicamentos incompatíveis com a doação, podem procurar um banco de leite para iniciar o processo.",
			},
			{
				list: [
					"Estar amamentando e produzir leite excedente",
					"Não fumar e não fazer uso de álcool ou drogas",
					"Não estar em tratamento com medicações restritivas",
					"Passar por uma avaliação de saúde simples",
				],
			},
			{ h: "O que é avaliado" },
			{
				p: "A equipe do banco de leite faz uma entrevista sobre saúde geral, hábitos e uso de medicamentos. Em alguns casos, exames de sangue já feitos no pré-natal são suficientes.",
			},
			{
				callout:
					"Cada banco de leite pode ter critérios levemente diferentes — a triagem final é sempre feita por um profissional de saúde, nunca por conta própria.",
			},
			{ h: "Como começar" },
			{
				p: "Ligue para o banco de leite mais próximo ou use o Disque Saúde (136) para agendar a primeira conversa e entender os próximos passos.",
			},
		],
	},
	{
		id: 7,
		category: "Acolhimento",
		accent: "#e0457a",
		soft: "#fdf1f5",
		softBorder: "#fadbe7",
		title: "Diário de uma doadora: a história da Juliana e do Theo",
		coverImage: diarioDoadora,
		coverAlt: "Mãos servindo leite materno em um recipiente",
		coverWidth: 776,
		coverHeight: 486,
		author: "Camila Duarte",
		authorInitials: "CD",
		authorBio:
			"Jornalista colaboradora da rBLH, escreve histórias reais de doadoras e famílias apoiadas pela rede de bancos de leite.",
		date: "17 de julho, 2026",
		readTimeMinutes: 6,
		takeaways: [
			"Como começou a jornada de doação da Juliana",
			"Os desafios da rotina com um recém-nascido",
			"O que mudou depois da primeira doação",
			"A mensagem da Juliana para novas doadoras",
		],
		videoTitle: "Juliana e Theo: uma história de doação",
		videoDuration: "7:12",
		blocks: [
			{
				p: "Juliana descobriu que produzia leite além do que o filho, Theo, conseguia mamar. Em vez de descartar o excedente, decidiu procurar um banco de leite — e essa escolha mudou sua rotina de um jeito que ela não esperava.",
			},
			{ h: "O começo da jornada" },
			{
				p: '"No início eu nem sabia que dava pra doar leite. Uma amiga comentou e eu fui atrás — foi bem mais simples do que eu imaginava", conta Juliana sobre os primeiros passos até a triagem.',
			},
			{ h: "A rotina com o Theo" },
			{
				list: [
					"Ordenha encaixada nos intervalos das mamadas",
					"Frascos etiquetados guardados no freezer",
					"Busca do leite feita pelo próprio banco de leite",
					"Acompanhamento a cada nova coleta",
				],
			},
			{ h: "O que mudou" },
			{
				p: '"Saber que meu leite ajudou bebês prematuros que eu nunca vou conhecer é uma sensação que não tem explicação", diz Juliana, hoje doadora há alguns meses.',
			},
			{
				callout:
					"Histórias como a da Juliana mostram que doar pode caber na rotina — o primeiro passo é sempre conversar com um banco de leite.",
			},
		],
	},
	{
		id: 8,
		category: "Nutrição",
		accent: "#65a30d",
		soft: "#ecfccb",
		softBorder: "#d9f99d",
		title: "Ferro, cálcio e vitamina D: os nutrientes-chave da lactação",
		coverImage: nutrientesLactacao,
		coverAlt:
			"Profissional de laboratório organizando frascos e tubos de amostras",
		coverWidth: 984,
		coverHeight: 653,
		author: "Carla Menezes",
		authorInitials: "CM",
		authorBio:
			"Nutricionista materno-infantil, atua com orientação alimentar de gestantes e lactantes na rede pública há 9 anos.",
		date: "13 de julho, 2026",
		readTimeMinutes: 5,
		takeaways: [
			"Por que esses três nutrientes merecem atenção na lactação",
			"Alimentos que são boas fontes de cada um",
			"Sinais de que vale conversar com um profissional",
			"Como manter as reservas do corpo em dia",
		],
		videoTitle: "Micronutrientes da nutriz: guia rápido",
		videoDuration: "4:20",
		blocks: [
			{
				p: "Durante a lactação, o corpo tem uma demanda maior por alguns nutrientes específicos. Conhecer os principais ajuda a montar refeições mais completas no dia a dia.",
			},
			{ h: "Ferro" },
			{
				p: "Importante para repor as reservas após o parto. Carnes magras, feijão e vegetais verde-escuros são boas fontes — combinar com uma fruta cítrica ajuda na absorção.",
			},
			{
				list: [
					"Ferro: carnes magras, feijão, vegetais verde-escuros",
					"Cálcio: leite e derivados, vegetais verde-escuros",
					"Vitamina D: exposição solar moderada e alguns peixes",
				],
			},
			{ h: "Cálcio e vitamina D" },
			{
				p: "O cálcio ajuda a manter a saúde óssea da nutriz, e a vitamina D auxilia sua absorção. Uma rotina com sol pela manhã, com proteção adequada, já contribui bastante.",
			},
			{
				callout:
					"Suplementação, quando necessária, deve ser sempre orientada por um profissional de saúde — evite se automedicar.",
			},
			{ h: "Mantendo as reservas em dia" },
			{
				p: "Uma alimentação variada, com acompanhamento nas consultas de rotina, costuma ser suficiente para a maioria das nutrizes saudáveis.",
			},
		],
	},
];

export function getArticleById(id: number | null): Article {
	return ARTICLES.find((article) => article.id === id) ?? ARTICLES[0];
}
