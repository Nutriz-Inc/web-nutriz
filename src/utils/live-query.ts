/**
 * Consultas "ao vivo".
 *
 * As telas da nutriz mostram o andamento de uma doacao que quem mexe e outra
 * pessoa: o admin aprova uma etapa do outro lado e, ate agora, a nutriz so via
 * a mudanca depois de recarregar a pagina na mao.
 *
 * Nao existe WebSocket nem SSE para doacoes — o unico WebSocket do app e o da
 * EVA, que vive em outro servico e fala outro protocolo. Entao a atualizacao
 * vem de recarga periodica do react-query, sem tocar em endpoint nenhum.
 *
 * `refetchIntervalInBackground: true` e deliberado, e nao o padrao. Sem ele o
 * react-query pausa o ciclo quando `document.visibilityState` vira "hidden" —
 * ou seja, sempre que a aba vai para tras de outra ou a janela e minimizada. E
 * exatamente o caso de quem deixa a tela da doadora aberta num monitor e vai
 * mexer em outra coisa: a tela parava de atualizar e so voltava a vida quando
 * alguem clicava nela. `refetchOnWindowFocus` continua ligado (padrao), entao
 * voltar para a aba tambem dispara uma leitura na hora.
 */

/**
 * 4s: rapido o bastante para a mudanca parecer instantanea de um lado da mesa
 * para o outro, e lento o bastante para nao pesar num plano gratuito.
 */
export const INTERVALO_AO_VIVO_MS = 4000;

/**
 * Intervalo para uma doacao que pode ou nao ter acabado. Doacao encerrada nao
 * muda mais de etapa: para de perguntar.
 */
export function intervaloAoVivo(encerrada: boolean) {
	return encerrada ? false : INTERVALO_AO_VIVO_MS;
}

/** Opcoes de consulta que se recarrega sozinha, mesmo com a aba atras. */
export const OPCOES_AO_VIVO = {
	refetchInterval: INTERVALO_AO_VIVO_MS,
	refetchIntervalInBackground: true,
} as const;
