/**
 * Identificador aleatorio para chaves de lista no formulario (bebes do
 * cadastro e do perfil). Nunca vai para a API — e so o `key` do React.
 *
 * Por que nao usar `crypto.randomUUID()` direto: ele so existe em contexto
 * seguro (HTTPS ou localhost). Abrindo o app pelo IP da rede em http — que e
 * exatamente como se testa no celular — ele vem `undefined`, e como a chamada
 * acontecia no topo do modulo, o app inteiro quebrava antes de montar: tela
 * branca em qualquer rota. Aqui a funcao degrada em vez de estourar.
 */
export function randomId(): string {
	const web = globalThis.crypto;

	if (typeof web?.randomUUID === "function") {
		return web.randomUUID();
	}

	if (typeof web?.getRandomValues === "function") {
		const bytes = web.getRandomValues(new Uint8Array(16));

		return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
			"",
		);
	}

	return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
