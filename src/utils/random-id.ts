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
