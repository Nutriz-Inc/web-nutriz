import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
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

export const routerPrivate = createBrowserRouter([
	{
		path: "/home",
		element: <HomePage />,
	},
	{
		path: "/*",
		element: <DefaultRedirect />,
	},
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/pontos-de-coleta",
				element: <DonationPointsPage />,
				handle: { title: "Pontos de Coleta" },
			},
			{
				path: "/perfil",
				element: <ProfilePage />,
				handle: { title: "Perfil" },
			},
			{
				path: "/minhas-doacoes",
				element: <DonationsPage />,
				handle: { title: "Minhas doações" },
			},
			{
				path: "/nova-doacao",
				element: <NewDonationPage />,
				handle: { title: "Nova Doação" },
			},
			{
				path: "/gestao-doacoes",
				element: <DonationsManagementPage />,
				handle: { title: "Doações" },
			},
			{
				path: "/doacao/:id_donation",
				element: <DonationInfoPage />,
				handle: { title: "Acompanhamento" },
			},
		],
	},
]);

export const publicRouter = createBrowserRouter([
	{
		path: "/",
		element: <LandingPageScreen />,
	},
	{
		path: "/login",
		element: <LoginScreen />,
	},
	{
		path: "/registro",
		element: <RegisterScreen />,
	},
	{
		path: "/artigos",
		element: <ArticlesScreen />,
	},
	{
		path: "*",
		element: <Navigate to="/" replace />,
	},
]);
