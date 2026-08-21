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
	/** Cor do icone na faixa do hero (fundo escuro). */
	accent: string;
	value: string;
	label: string;
	sublabel: string;
};

export const METRICS: Metric[] = [
	{
		Icon: Users,
		accent: "text-mint",
		value: "4.200+",
		label: "Doadoras ativas",
		sublabel: "Em todo o Brasil",
	},
	{
		Icon: Droplet,
		accent: "text-blue-tint-2",
		value: "12 mil L",
		label: "Leite coletado",
		sublabel: "Doados aos bancos de leite",
	},
	{
		Icon: Heart,
		accent: "text-eva-bright",
		value: "98%",
		label: "Satisfação",
		sublabel: "Das nossas doadoras",
	},
];

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
