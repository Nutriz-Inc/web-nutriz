export const env = import.meta.env;

export const evaApiUrl = (env.VITE_EVA_API_URL || "").replace(/\/+$/, "");

export const evaWsUrl = (
	env.VITE_EVA_WS_URL || evaApiUrl.replace(/^http/, "ws")
).replace(/\/+$/, "");
