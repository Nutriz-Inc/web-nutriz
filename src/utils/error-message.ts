const SEM_CONEXAO =
	"Sem conexão com o servidor. Verifique sua internet e tente novamente.";

const GENERICO =
	"Algo não saiu como esperado. Tente novamente em alguns instantes.";

const POR_STATUS: Record<number, string> = {
	400: "Não foi possível concluir. Confira os dados preenchidos e tente de novo.",
	401: "Sua sessão expirou. Entre novamente para continuar.",
	403: "Você não tem permissão para fazer isso.",
	404: "Não encontramos o que você procurava.",
	409: "Esse registro já existe.",
	422: "Alguns dados não estão no formato esperado. Revise e tente de novo.",
	429: "Muitas tentativas seguidas. Espere um instante e tente de novo.",
};

type ErroHttp = {
	response?: { status?: number };
	code?: string;
};

export function getErrorMessage(error: unknown): string {
	const erro = error as ErroHttp | null;

	if (!erro?.response) {
		return SEM_CONEXAO;
	}

	const status = erro.response.status;

	if (status && POR_STATUS[status]) {
		return POR_STATUS[status];
	}

	return GENERICO;
}
