import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AppointmentDetailPage } from "@/pages/private/appointments/detail";
import { AppointmentsPage } from "@/pages/private/appointments/list";
import { DonationManagementDetailPage } from "@/pages/private/donations/adm/info";
import { NewDonationPage } from "@/pages/private/donations/common/create";
import { DonationInfoPage } from "@/pages/private/donations/common/info";
import { DonationStepDetailPage } from "@/pages/private/donations/common/step-detail";
import { DonationPointsPage } from "../pages/private/donation-points";
import { DonationsManagementPage } from "../pages/private/donations/adm/list";
import { DonationsPage } from "../pages/private/donations/common/list";
import { HomePage } from "../pages/private/home";
import { ProfilePage } from "../pages/private/profile";
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
				path: "/agendamentos",
				element: <AppointmentsPage />,
				handle: { title: "Meus Agendamentos" },
			},
			{
				path: "/agendamentos/:id_job",
				element: <AppointmentDetailPage />,
				handle: { title: "Detalhes do Agendamento" },
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
