import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ContentHubPage } from "@/pages/private/content-hub";
import { DonationManagementDetailPage } from "@/pages/private/donations/adm/info";
import { NewDonationPage } from "@/pages/private/donations/common/create";
import { DonationInfoPage } from "@/pages/private/donations/common/info";
import { DonationStepDetailPage } from "@/pages/private/donations/common/step-detail";
import { AppointmentDetailPage } from "@/pages/private/job/detail";
import { AppointmentsPage } from "@/pages/private/job/list";
import { DonationPointsPage } from "../pages/private/donation-points";
import { DonationsManagementPage } from "../pages/private/donations/adm/list";
import { DonationsPage } from "../pages/private/donations/common/list";
import { HomePage } from "../pages/private/home";
import { ProfilePage } from "../pages/private/profile";
import { UserManagementDetailPage } from "../pages/private/users/adm/info";
import { UsersManagementPage } from "../pages/private/users/list";
import { ArticlesScreen } from "../pages/public/articles";
import { LandingPageScreen } from "../pages/public/landing-page";
import { LoginScreen } from "../pages/public/login";
import { RegisterScreen } from "../pages/public/register";
import { DefaultRedirect } from "./DefaultRedirect";

export function routerPrivate() {
	return createBrowserRouter([
		{
			id: "private-home",
			path: "/home",
			element: <HomePage />,
		},
		{
			id: "private-artigos",
			path: "/artigos",
			element: <ArticlesScreen />,
		},
		{
			id: "private-fallback",
			path: "/*",
			element: <DefaultRedirect />,
		},
		{
			id: "private-layout",
			path: "/",
			element: <Layout />,
			children: [
				{
					id: "private-pontos-de-coleta",
					path: "/pontos-de-coleta",
					element: <DonationPointsPage />,
				},
				{
					id: "private-conteudo-educativo",
					path: "/conteudo-educativo",
					element: <ContentHubPage />,
				},
				{
					id: "private-perfil",
					path: "/perfil",
					element: <ProfilePage />,
				},
				{
					id: "private-minhas-doacoes",
					path: "/minhas-doacoes",
					element: <DonationsPage />,
				},
				{
					id: "private-agendamentos",
					path: "/agendamentos",
					element: <AppointmentsPage />,
				},
				{
					id: "private-agendamento-detalhe",
					path: "/agendamentos/:id_job",
					element: <AppointmentDetailPage />,
				},
				{
					id: "private-nova-doacao",
					path: "/nova-doacao",
					element: <NewDonationPage />,
				},
				{
					id: "private-gestao-doacoes",
					path: "/gestao-doacoes",
					element: <DonationsManagementPage />,
				},
				{
					id: "private-doacao-info",
					path: "/doacao/:id_donation",
					element: <DonationInfoPage />,
				},
				{
					id: "private-gestao-doacoes-detalhe",
					path: "/gestao-doacoes/:id_donation",
					element: <DonationManagementDetailPage />,
				},
				{
					id: "private-usuarios-detalhe",
					path: "/usuarios/:id_user",
					element: <UserManagementDetailPage />,
				},
				{
					id: "private-doacao-etapa",
					path: "/doacao/:id_donation/etapa/:id_donation_step",
					element: <DonationStepDetailPage />,
				},
				{
					id: "private-usuarios",
					path: "/usuarios",
					element: <UsersManagementPage />,
				},
			],
		},
	]);
}

export function publicRouter() {
	return createBrowserRouter([
		{
			id: "public-landing",
			path: "/",
			element: <LandingPageScreen />,
		},
		{
			id: "public-login",
			path: "/login",
			element: <LoginScreen />,
		},
		{
			id: "public-registro",
			path: "/registro",
			element: <RegisterScreen />,
		},
		{
			id: "public-artigos",
			path: "/artigos",
			element: <ArticlesScreen />,
		},
		{
			id: "public-fallback",
			path: "*",
			element: <Navigate to="/" replace />,
		},
	]);
}
