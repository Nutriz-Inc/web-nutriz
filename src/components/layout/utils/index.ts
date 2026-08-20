import {
	BookOpen,
	CalendarCheck,
	ClipboardList,
	Droplets,
	Home,
	LayoutDashboard,
	type LucideProps,
	MapPin,
	User,
	Users,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
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
	// Item de rota (to) OU de acao (action), para um item que dispara um widget
	// global em vez de navegar. Hoje nenhum item usa `action`.
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
];

const navItemsUserAdmin: NavItem[] = [
	{
		label: "Dashboard",
		icon: LayoutDashboard,
		to: "/dashboard",
		adminOnly: true,
	},
	{
		label: "Gestão de Doações",
		icon: ClipboardList,
		to: "/gestao-doacoes",
		adminOnly: true,
	},
	{
		label: "Usuários",
		icon: Users,
		to: "/usuarios",
		adminOnly: true,
	},
	{ label: "Pontos de Coleta", icon: MapPin, to: "/pontos-de-coleta" },
	{ label: "Perfil", icon: User, to: "/perfil" },
];

const navItemsUserNurse: NavItem[] = [
	{ label: "Meus Agendamentos", icon: CalendarCheck, to: "/agendamentos" },
	{ label: "Perfil", icon: User, to: "/perfil" },
];

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
