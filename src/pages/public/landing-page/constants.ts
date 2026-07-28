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
import { LinkedinIcon } from "../../../assets/icons/LinkedinIcon";
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
	color: string;
};

export const STEPS: Step[] = [
	{
		number: "1",
		title: "Cadastre-se e faça triagem",
		description:
			"Clique em Quero doar e nossa equipe entrará em contato via WhatsApp para a triagem inicial.",
		color: "#00458b",
	},
	{
		number: "2",
		title: "Realize os exames",
		description:
			"Exames simples de saúde para garantir a segurança do leite para os bebês receptores.",
		color: "#0e9e94",
	},
	{
		number: "3",
		title: "Doe e acompanhe",
		description:
			"Coletamos o leite e você acompanha cada etapa pela plataforma em tempo real.",
		color: "#f2579f",
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
		iconClassName: "size-6 text-[#00458b]",
		iconBg: "bg-[#e6f1fb]",
		value: "4.200+",
		valueColor: "text-[#00458b]",
		label: "Doadoras ativas",
		sublabel: "Em todo o Brasil",
	},
	{
		Icon: Droplet,
		iconClassName: "size-6 text-[#0e9e94]",
		iconBg: "bg-[#e1f5ee]",
		value: "12 mil L",
		valueColor: "text-[#0e9e94]",
		label: "Leite coletado",
		sublabel: "Doados aos bancos de leite",
	},
	{
		Icon: Heart,
		iconClassName: "size-6 fill-[#f2579f] text-[#f2579f]",
		iconBg: "bg-[#fbeaf0]",
		value: "98%",
		valueColor: "text-[#f2579f]",
		label: "Satisfação",
		sublabel: "Das nossas doadoras",
	},
];

// Fundo do bloco da EVA na landing. Gradiente da marca escurecido o bastante
// para o texto branco atingir WCAG AA (>=4.5:1) em qualquer ponto - a versao
// pastel da referencia nao passava contraste com texto branco.
export const EVA_LANDING_BG =
	"linear-gradient(120deg, #b8531f 0%, #c0295e 44%, #7a45b0 100%)";

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
	{ label: "LinkedIn", Icon: LinkedinIcon },
];

export const CTA_AVATARS = ["#f2579f", "#2fd9c5", "#387ccd", "#72f2eb"];
