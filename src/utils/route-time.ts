export const LIMITE_ROTA_HORAS = 6;

export const LIMITE_ROTA_MS = LIMITE_ROTA_HORAS * 60 * 60 * 1000;

export const AVISO_ROTA_MS = 5 * 60 * 60 * 1000;

export function formatarDuracaoCurta(ms: number): string {
	const totalMinutos = Math.max(Math.round(ms / 60000), 0);
	const horas = Math.floor(totalMinutos / 60);
	const minutos = totalMinutos % 60;

	if (horas === 0) {
		return `${minutos} min`;
	}

	if (minutos === 0) {
		return `${horas}h`;
	}

	return `${horas}h ${minutos}min`;
}

export type SituacaoLimite = {
	decorridoMs: number;
	restanteMs: number;
	excedeu: boolean;
	emAviso: boolean;
	rotulo: string;
};

export function situacaoLimiteRota(
	dateStart?: string,
	dateEnd?: string,
	agora: number = Date.now(),
): SituacaoLimite | null {
	if (!dateStart) return null;

	const inicio = new Date(dateStart).getTime();
	const fim = dateEnd ? new Date(dateEnd).getTime() : agora;
	const decorridoMs = Math.max(fim - inicio, 0);
	const restanteMs = Math.max(LIMITE_ROTA_MS - decorridoMs, 0);
	const excedeu = decorridoMs >= LIMITE_ROTA_MS;
	const emAviso = !excedeu && decorridoMs >= AVISO_ROTA_MS;

	return {
		decorridoMs,
		restanteMs,
		excedeu,
		emAviso,
		rotulo: excedeu
			? `Passou das ${LIMITE_ROTA_HORAS}h`
			: `Restam ${formatarDuracaoCurta(restanteMs)} das ${LIMITE_ROTA_HORAS}h`,
	};
}
