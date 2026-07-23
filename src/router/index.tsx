import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ContentHubPage } from "@/pages/private/content-hub";
import { NewDonationPage } from "@/pages/private/donations/create";
import { DonationInfoPage } from "@/pages/private/donations/info";
import { DonationPointsPage } from "../pages/private/donation-points";
import { DonationsPage } from "../pages/private/donations/list";
import { DonationsManagementPage } from "../pages/private/donations/manage";
import { HomePage } from "../pages/private/home";
import { ProfilePage } from "../pages/private/profile";
import { ArticlesScreen } from "../pages/public/articles";
import { LandingPageScreen } from "../pages/public/landing-page";
import { LoginScreen } from "../pages/public/login";
import { RegisterScreen } from "../pages/public/register";
import { DefaultRedirect } from "./DefaultRedirect";

export function createPrivateRouter() {
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
					handle: { title: "Pontos de Coleta" },
				},
				{
					id: "private-conteudo-educativo",
					path: "/conteudo-educativo",
					element: <ContentHubPage />,
					handle: { title: "Conteúdo educativo" },
				},
				{
					id: "private-perfil",
					path: "/perfil",
					element: <ProfilePage />,
					handle: { title: "Perfil" },
				},
				{
					id: "private-minhas-doacoes",
					path: "/minhas-doacoes",
					element: <DonationsPage />,
					handle: { title: "Minhas doações" },
				},
				{
					id: "private-nova-doacao",
					path: "/nova-doacao",
					element: <NewDonationPage />,
					handle: { title: "Nova Doação" },
				},
				{
					id: "private-gestao-doacoes",
					path: "/gestao-doacoes",
					element: <DonationsManagementPage />,
					handle: { title: "Doações" },
				},
				{
					id: "private-doacao-info",
					path: "/doacao/:id_donation",
					element: <DonationInfoPage />,
					handle: { title: "Acompanhamento" },
				},
			],
		},
	]);
}

export function createPublicRouter() {
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
