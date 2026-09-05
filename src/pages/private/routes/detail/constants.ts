import { CLASSE_SHEET_CONTEUDO } from "@/components/ui/sheet";
import { CLASSE_CAMPO } from "@/lib/form-classes";

export const LIMITE_ROTA_MS = 6 * 60 * 60 * 1000;

export const AVISO_ROTA_MS = 5 * 60 * 60 * 1000;

export const TEMPO_SEGURANCA_PARADA_MIN = 15;

export type TipoDeProblema =
	| "veiculo"
	| "transito"
	| "acesso"
	| "doadora"
	| "material"
	| "outro";

export const TIPOS_DE_PROBLEMA: { valor: TipoDeProblema; rotulo: string }[] = [
	{ valor: "veiculo", rotulo: "Problema com o veículo" },
	{ valor: "transito", rotulo: "Trânsito ou via bloqueada" },
	{ valor: "acesso", rotulo: "Não consegui acessar o local" },
	{ valor: "doadora", rotulo: "Doadora ausente ou indisponível" },
	{ valor: "material", rotulo: "Problema com o material coletado" },
	{ valor: "outro", rotulo: "Outro" },
];

export const MENSAGENS_DE_ERRO: Record<string, string> = {
	"route.canceled_or_done":
		"Esta rota já foi encerrada e não pode mais ser alterada.",
	"route.date_start_already_set": "Esta rota já tinha sido iniciada.",
	"route.date_end_already_set": "Esta rota já tinha sido finalizada.",
	"route.not_started": "A rota ainda não foi iniciada.",
	"route.forbidden": "Esta rota pertence a outro motorista.",
	"route.max_duration_exceeded":
		"Com esta parada a rota passa do limite de 6 horas.",
	"route.mileage_and_user_feedback_required":
		"Informe a quilometragem e o relato para finalizar.",
	"route.description_required": "Descreva o motivo do cancelamento.",
	"route.no_fields_to_update": "Nenhuma alteração foi enviada.",
	"route.invalid_fields_for_adm":
		"Esta ação não é permitida para o seu perfil.",
	"route.invalid_fields_for_driver":
		"Esta ação não é permitida para o seu perfil.",
	"route.canceled": "Rotas canceladas não podem ser alteradas.",
	"route_stop.date_start_already_set": "Esta parada já foi registrada.",
	"stops.duplicated": "Esta etapa já é uma parada da rota.",
	"stops.invalid_city": "Esta etapa não fica na cidade da rota.",
	"stops.invalid_neighborhood": "Esta etapa não fica no bairro da rota.",
	"stops.invalid_id": "Etapa de doação inválida.",
	"stops.no_address": "Esta etapa não tem endereço cadastrado.",
	"stops.already_in_route": "Esta etapa já está em outra rota ativa.",
	"donation.inactive": "A doação desta etapa não está mais ativa.",
	"user.forbidden": "Você não tem permissão para esta ação.",
};

export const ERRO_GENERICO =
	"Não foi possível concluir a ação. Tente novamente.";

export const CLASSE_SHEET = CLASSE_SHEET_CONTEUDO;

export const CLASSE_CAMPO_TEXTO = CLASSE_CAMPO;
export {
	CLASSE_BOTAO_PERIGO,
	CLASSE_BOTAO_PRIMARIO,
	CLASSE_BOTAO_SECUNDARIO,
} from "@/lib/form-classes";

export const CLASSE_ALTURA_PAINEL = "h-[380px] sm:h-[420px] xl:h-[560px]";
