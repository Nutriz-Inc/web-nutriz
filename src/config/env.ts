export const env = import.meta.env;

// Base HTTP do serviço da EVA (nutriz-ia-service), sem barra(s) final(is):
// evita o //session/anonymous que dava 404 em produção quando a env tinha "/".
export const evaApiUrl = (env.VITE_EVA_API_URL || "").replace(/\/+$/, "");

// URL do WebSocket derivada da base HTTP num único ponto (http->ws, https->wss).
// VITE_EVA_WS_URL, se definida, sobrepõe — fallback opcional e retrocompatível.
export const evaWsUrl = (
	env.VITE_EVA_WS_URL || evaApiUrl.replace(/^http/, "ws")
).replace(/\/+$/, "");
