import { Baby, Lock, type LucideIcon, MapPin, User } from "lucide-react";

export const WIZARD_STEPS = [
	"Dados pessoais",
	"Endereço",
	"Senha",
	"Bebê e termos",
];

/**
 * Cabecalho de cada etapa, dentro do cartao do formulario. O `legend` dos
 * componentes de etapa vira `sr-only` para nao repetir o titulo na tela.
 */
export const WIZARD_STEP_META: {
	title: string;
	description: string;
	icon: LucideIcon;
}[] = [
	{
		title: "Dados pessoais",
		description: "Como a equipe Lactare vai te identificar e falar com você.",
		icon: User,
	},
	{
		title: "Endereço",
		description: "É onde tudo acontece: exames, entrega do kit e a coleta.",
		icon: MapPin,
	},
	{
		title: "Senha",
		description: "Para entrar e acompanhar suas doações por aqui.",
		icon: Lock,
	},
	{
		title: "Bebê e termos",
		description: "Confira os dados, conte do seu bebê e aceite os termos.",
		icon: Baby,
	},
];

export const TERMS_VERSION = "1.0";

export const FALLBACK_IP = "0.0.0.0";
