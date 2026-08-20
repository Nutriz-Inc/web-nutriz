/**
 * CONTEUDO INSTITUCIONAL / ILUSTRATIVO — NAO E DADO REAL DA API.
 *
 * Os depoimentos abaixo vieram do design e sao ficticios. Nao ha endpoint de
 * historias no backend hoje. Estao isolados aqui, fora dos componentes, para
 * que produto decida antes da apresentacao: manter, trocar por depoimento real
 * autorizado, ou remover a secao.
 *
 * TODO: API — substituir por uma fonte real de depoimentos quando existir.
 */
export const INSTITUTIONAL_STORIES = [
	{
		tag: "UTI",
		quote:
			"Seu leite ajudou o pequeno Davi, prematuro de 800g, a ganhar peso e ter alta da UTI neonatal.",
		author: "Equipe Lactário, Hospital São Luiz",
	},
	{
		tag: "CM",
		quote:
			"Doar durante a licença virou parte da minha rotina com o Théo. Hoje já são 6 doações.",
		author: "Camila M., doadora desde 2025",
	},
] as const;

/**
 * O design exibia "128 histórias compartilhadas". Esse numero NAO existe na API
 * e nao pode ser apresentado como metrica real, entao o contador fica oculto.
 * TODO: API — reativar quando houver um total real de historias.
 */
export const STORIES_TOTAL: number | null = null;
