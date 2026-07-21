import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { NewDonationPage } from "@/pages/private/donations/common/create";
import { DonationInfoPage } from "@/pages/private/donations/common/info";
import { DonationManagementDetailPage } from "@/pages/private/donations/adm/info";
import { DonationPointsPage } from "../pages/private/donation-points";
import { DonationsPage } from "../pages/private/donations/common/list";
import { DonationsManagementPage } from "../pages/private/donations/adm/list";
import { HomePage } from "../pages/private/home";
import { ProfilePage } from "../pages/private/profile";
import { LandingPageScreen } from "../pages/public/landing-page";
import { LoginScreen } from "../pages/public/login";
import { RegisterScreen } from "../pages/public/register";
import { DefaultRedirect } from "./DefaultRedirect";
import { DonationStepDetailPage } from "@/pages/private/donations/common/step-detail";

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
				path: "/gestao-doacoes/:id_donation",
				element: <DonationManagementDetailPage />,
				handle: { title: "Editar Doação" },
			},
			{
				path: "/doacao/:id_donation",
				element: <DonationInfoPage />,
				handle: { title: "Acompanhamento" },
			},
			{
				path: "/doacao/:id_donation/etapa/:id_donation_step",
				element: <DonationStepDetailPage />,
				handle: { title: "Etapa da Doação" },
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
		path: "*",
		element: <Navigate to="/" replace />,
	},
]);
