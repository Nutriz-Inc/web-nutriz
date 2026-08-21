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
 * Dois detalhes que fazem isso custar pouco:
 *
 * - `refetchIntervalInBackground` segue desligado (o padrao), entao o
 *   intervalo pausa sozinho quando a aba sai de primeiro plano;
 * - `refetchOnWindowFocus` tambem e o padrao, entao voltar para a aba ja
 *   dispara uma leitura na hora, sem esperar o proximo ciclo.
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
