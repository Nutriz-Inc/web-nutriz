export const FEATURED_MAIN_ID = 1;
export const FEATURED_MEDIUM_IDS = [2, 3];
export const VIDEO_IDS = [1, 7, 8];

export type QuickTip = {
	title: string;
	description: string;
};

export const QUICK_TIPS: QuickTip[] = [
	{
		title: "Hidrate-se a cada ordenha",
		description:
			"Um copo de água a cada mamada ou coleta mantém a produção estável ao longo do dia.",
	},
	{
		title: "Congele imediatamente",
		description:
			"O frasco vai ao freezer logo após a coleta — nunca na porta da geladeira.",
	},
	{
		title: "Identifique cada frasco",
		description:
			"Data e hora da primeira coleta escritas na tampa evitam perder o prazo de 15 dias.",
	},
	{
		title: "Ligue 136 para dúvidas",
		description:
			"O Disque Saúde localiza o banco de leite mais próximo e orienta sobre a triagem.",
	},
];

export type FaqItem = {
	question: string;
	answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
	{
		question: "Doar leite diminui o leite do meu bebê?",
		answer:
			"Não. A produção funciona por demanda: o que é retirado a mais tende a estimular ainda mais a produção. Se notar qualquer mudança na amamentação, converse com o banco de leite.",
	},
	{
		question: "Preciso fazer exames para doar?",
		answer:
			"Alguns exames já feitos no pré-natal costumam ser suficientes. A equipe do banco de leite avalia caso a caso durante a triagem.",
	},
	{
		question: "Quanto leite preciso doar?",
		answer:
			"Não existe quantidade mínima obrigatória — cada gota faz diferença. Você doa o excedente que sua produção permitir, no seu ritmo.",
	},
	{
		question: "Como o leite chega até os bebês?",
		answer:
			"Depois de coletado, o leite passa por pasteurização e testes de qualidade no banco de leite antes de ser distribuído a bebês prematuros ou internados que precisam dele.",
	},
	{
		question: "Posso doar tomando medicamentos?",
		answer:
			"Depende do medicamento. A equipe do banco de leite avalia cada caso na triagem — por isso é importante informar tudo o que você está usando.",
	},
];
