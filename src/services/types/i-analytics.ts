export type PeriodoDoIndicador = {
	rotulo: string;
	inicio: string | null;
	fim: string | null;
};

export type RotaEmAndamento = {
	id_rota: string;
	rota: string;
	motorista: string | null;
	regiao: string | null;
	iniciada_em: string | null;
	horas_decorridas: number | null;
	horas_restantes_ate_6h: number | null;
	passou_de_6h: boolean;
	em_alerta: boolean;
	paradas: number;
	paradas_feitas: number;
	paradas_com_imprevisto: number;
};

export type OperacaoAgora = {
	gerado_em: string;
	rotas_em_andamento: RotaEmAndamento[];
	rotas_agendadas_hoje: number;
	rotas_concluidas_hoje: number;
	agendamentos_pendentes_hoje: number;
	agendamentos_atrasados: number;
	alertas: {
		rotas_passando_de_6h: number;
		rotas_em_alerta_5h: number;
		exames_vencendo_em_30_dias: number;
		exames_vencidos_com_doacao_ativa: number;
		doacoes_paradas_ha_mais_de_7_dias: number;
		rotas_agendadas_que_nao_iniciaram: number;
	};
};

export type CadeiaFria = {
	periodo: PeriodoDoIndicador;
	limite_horas: number;
	rotas_no_periodo: number;
	rotas_concluidas: number;
	rotas_com_duracao_medida: number;
	rotas_dentro_de_6h: number;
	rotas_acima_de_6h: number;
	conformidade_6h_pct: number | null;
	duracao_media_horas: number | null;
	duracao_estimada_media_horas: number | null;
	maior_duracao_horas: number | null;
	rotas_que_passaram_de_6h: {
		rota: string;
		motorista: string | null;
		data: string | null;
		horas: number | null;
	}[];
};

export type Logistica = {
	periodo: PeriodoDoIndicador;
	rotas_concluidas: number;
	km_rodados: number;
	km_medio_por_rota: number | null;
	litros_coletados_nas_rotas: number;
	km_por_litro_coletado: number | null;
	rotas_com_km_implausivel: number;
	km_maximo_por_rota: number;
	litros_por_rota: number | null;
	paradas: number;
	paradas_feitas: number;
	paradas_com_imprevisto: number;
	taxa_de_imprevisto_pct: number | null;
	paradas_por_rota: number | null;
};

export type EtapaDoFunil = {
	etapa: string;
	doacoes_que_chegaram: number;
	doacoes_que_concluiram: number;
	conversao_da_etapa_pct: number | null;
	alcance_desde_o_inicio_pct: number | null;
	dias_medios_para_concluir: number | null;
	doacoes_ativas_nesta_etapa_agora: number;
	paradas_ha_mais_de_7_dias: number;
};

export type FunilDaDoadora = {
	periodo: PeriodoDoIndicador;
	doacoes_iniciadas: number;
	etapas: EtapaDoFunil[];
	gargalo_por_tempo: string | null;
	gargalo_por_fila: string | null;
};

export type DesempenhoDosMotoristas = {
	periodo: PeriodoDoIndicador;
	motoristas: {
		motorista: string;
		rotas: number;
		rotas_concluidas: number;
		rotas_com_erro: number;
		km_rodados: number | null;
		horas_em_rota: number | null;
		conformidade_6h_pct: number | null;
		paradas: number;
		paradas_com_imprevisto: number;
		taxa_de_imprevisto_pct: number | null;
	}[];
};

export type Regioes = {
	periodo: PeriodoDoIndicador;
	agrupado_por: "cidade" | "bairro";
	regioes: {
		regiao: string;
		doadoras: number;
		doacoes: number;
		litros: number;
	}[];
};

export type HorarioDaAgenda = {
	hora: number;
	agendados: number;
	vagas: number;
	lotado: boolean;
};

export type AgendaDoDia = {
	data: string;
	capacidade_por_horario: number;
	capacidade_por_dia: number;
	agendados_no_dia: number;
	vagas_no_dia: number;
	dia_lotado: boolean;
	agendados_fora_do_expediente: number;
	horarios: HorarioDaAgenda[];
};

export type ConsultasDeIndicadores = {
	agenda: AgendaDoDia;
	operacao_agora: OperacaoAgora;
	cadeia_fria: CadeiaFria;
	logistica: Logistica;
	funil_doadora: FunilDaDoadora;
	desempenho_motoristas: DesempenhoDosMotoristas;
	regioes: Regioes;
};

export type FiltroDeIndicadores = {
	inicio?: string;
	fim?: string;
	periodo?: string;
	agrupar_por?: "cidade" | "bairro";
	data?: string;
	ignorar?: string;
};
