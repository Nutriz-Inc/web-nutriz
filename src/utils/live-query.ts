export const INTERVALO_AO_VIVO_MS = 4000;

export function intervaloAoVivo(encerrada: boolean) {
	return encerrada ? false : INTERVALO_AO_VIVO_MS;
}

export const OPCOES_AO_VIVO = {
	refetchInterval: INTERVALO_AO_VIVO_MS,
	refetchIntervalInBackground: true,
} as const;
