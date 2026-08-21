import {
	BookOpen,
	Droplet,
	Heart,
	HelpCircle,
	type LucideIcon,
	MapPin,
	MessageCircle,
	Quote,
	Users,
} from "lucide-react";
import { DonateIcon } from "../../../assets/icons/DonateIcon";
import { ExamIcon } from "../../../assets/icons/ExamIcon";
import { FacebookIcon } from "../../../assets/icons/FacebookIcon";
import { InstagramIcon } from "../../../assets/icons/InstagramIcon";
import { RegisterIcon } from "../../../assets/icons/RegisterIcon";
import { YoutubeIcon } from "../../../assets/icons/YoutubeIcon";

export type NavLink = {
	label: string;
	targetId: string;
};

export const NAV_LINKS: NavLink[] = [
	{ label: "Como funciona", targetId: "como-funciona" },
	{ label: "Pontos de coleta", targetId: "pontos-de-coleta" },
	{ label: "A EVA", targetId: "a-eva" },
	{ label: "Artigos", targetId: "artigos" },
	{ label: "Depoimentos", targetId: "depoimentos" },
];

export const NAV_ICONS: Record<string, LucideIcon> = {
	"como-funciona": HelpCircle,
	"pontos-de-coleta": MapPin,
	"a-eva": MessageCircle,
	artigos: BookOpen,
	depoimentos: Quote,
};

export type Step = {
	number: string;
	title: string;
	description: string;
	/** Fundo da bolha do numero. */
	badge: string;
	/** Cor do icone da etapa. */
	accent: string;
};

export const STEPS: Step[] = [
	{
		number: "1",
		title: "Cadastre-se e faça triagem",
		description:
			"Clique em Quero doar e nossa equipe entrará em contato via WhatsApp para a triagem inicial.",
		badge: "bg-blue",
		accent: "text-blue",
	},
	{
		number: "2",
		title: "Realize os exames",
		description:
			"Exames simples de saúde para garantir a segurança do leite para os bebês receptores.",
		badge: "bg-teal",
		accent: "text-teal",
	},
	{
		number: "3",
		title: "Doe e acompanhe",
		description:
			"Coletamos o leite e você acompanha cada etapa pela plataforma em tempo real.",
		badge: "bg-eva",
		accent: "text-eva",
	},
];

export const STEP_ICONS = [RegisterIcon, ExamIcon, DonateIcon];

export type Metric = {
	Icon: LucideIcon;
	iconClassName: string;
	iconBg: string;
	value: string;
	valueColor: string;
	label: string;
	sublabel: string;
};

export const METRICS: Metric[] = [
	{
		Icon: Users,
		iconClassName: "size-6 text-blue-deep",
		iconBg: "bg-blue-tint",
		value: "4.200+",
		valueColor: "text-blue-deep",
		label: "Doadoras ativas",
		sublabel: "Em todo o Brasil",
	},
	{
		Icon: Droplet,
		iconClassName: "size-6 text-teal",
		iconBg: "bg-success-tint",
		value: "12 mil L",
		valueColor: "text-teal",
		label: "Leite coletado",
		sublabel: "Doados aos bancos de leite",
	},
	{
		Icon: Heart,
		iconClassName: "size-6 fill-eva text-eva",
		iconBg: "bg-eva-tint",
		value: "98%",
		valueColor: "text-eva",
		label: "Satisfação",
		sublabel: "Das nossas doadoras",
	},
];

// Fundo do bloco da EVA na landing: gradiente pastel da marca (pessego ->
// rosa -> lilas), como na referencia. O contraste vem do TEXTO ESCURO sobre o
// pastel (ver EvaSection) - no ponto mais claro do gradiente (#fbdcc4) o texto
// #1c1b1f fica em ~13:1, bem acima do minimo WCAG AA (4.5:1).
export const EVA_LANDING_BG =
	"linear-gradient(120deg, #fbdcc4 0%, #f6bdd2 48%, #ccb4e8 100%)";

export type FooterLink = {
	label: string;
	targetId?: string;
	to?: string;
};

export const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
	{
		title: "Plataforma",
		links: [
			{ label: "Como funciona", targetId: "como-funciona" },
			{ label: "Pontos de coleta", targetId: "pontos-de-coleta" },
			{ label: "A EVA", targetId: "a-eva" },
		],
	},
	{
		title: "Conteúdo",
		links: [
			{ label: "Artigos", targetId: "artigos" },
			{ label: "Depoimentos", targetId: "depoimentos" },
			{ label: "Entrar", to: "/login" },
		],
	},
];

export const FOOTER_SOCIALS = [
	{ label: "Instagram", Icon: InstagramIcon },
	{ label: "Facebook", Icon: FacebookIcon },
	{ label: "YouTube", Icon: YoutubeIcon },
];

/** Bolinhas decorativas do CTA final, em tokens da paleta. */
export const CTA_AVATARS = [
	"bg-eva",
	"bg-mint",
	"bg-blue-bright",
	"bg-mint-bright",
];
