import {
	BookOpen,
	ClipboardList,
	Droplets,
	Home,
	type LucideProps,
	MapPin,
	MessageCircle,
	User,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { openEva } from "@/pages/private/eva/widget/eva-widget-bus";
import { EnumUserType } from "@/services/types/i-user";

export function getInitials(name: string | undefined): string {
	if (!name) return "U";
	return name
		.split(" ")
		.slice(0, 2)
		.map((n) => n[0])
		.join("")
		.toUpperCase();
}

export type NavItem = {
	label: string;
	icon: ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
	>;
	// Item de rota (to) OU de acao (action) - a EVA e um widget global, nao
	// uma pagina, entao o item dela dispara openEva() em vez de navegar.
	to?: string;
	action?: () => void;
	adminOnly?: boolean;
};

const navItemsUserCommon: NavItem[] = [
	{ label: "Início", icon: Home, to: "/home" },
	{ label: "Pontos de Coleta", icon: MapPin, to: "/pontos-de-coleta" },
	{ label: "Minhas doações", icon: Droplets, to: "/minhas-doacoes" },
	{ label: "Conteúdo educativo", icon: BookOpen, to: "/conteudo-educativo" },
	{ label: "Perfil", icon: User, to: "/perfil" },
	{ label: "EVA — Assistente Virtual", icon: MessageCircle, action: openEva },
	{
		label: "Gestão de Doações",
		icon: ClipboardList,
		to: "/gestao-doacoes",
		adminOnly: true,
	},
];

const navItemsUserAdmin: NavItem[] = [
	{
		label: "Gestão de Doações",
		icon: ClipboardList,
		to: "/gestao-doacoes",
		adminOnly: true,
	},
	{ label: "Pontos de Coleta", icon: MapPin, to: "/pontos-de-coleta" },
];

const navItemsUserNurse: NavItem[] = [];

export function getUserMenu(userType: EnumUserType) {
	switch (userType) {
		case EnumUserType.Admin:
			return navItemsUserAdmin;
		case EnumUserType.Nurse:
			return navItemsUserNurse;
		default:
			return navItemsUserCommon;
	}
}

export function getuserRootPage(userType?: EnumUserType) {
	if (!userType) return "/home";

	switch (userType) {
		case EnumUserType.Admin:
			return "/gestao-doacoes";
		case EnumUserType.Nurse:
			return "/agendamentos";
		default:
			return "/home";
	}
}
