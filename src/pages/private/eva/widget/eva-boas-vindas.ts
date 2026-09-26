function chaveDasBoasVindas(userId: string) {
	return `eva:welcome-seen:${userId}`;
}

export function jaViuBoasVindas(userId: string | null) {
	if (!userId) {
		return false;
	}

	try {
		return localStorage.getItem(chaveDasBoasVindas(userId)) === "1";
	} catch {
		return false;
	}
}

export function marcarBoasVindasVistas(userId: string | null) {
	if (!userId) {
		return;
	}

	try {
		localStorage.setItem(chaveDasBoasVindas(userId), "1");
	} catch {}
}
