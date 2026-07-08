import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { DonationPointsPage } from "../pages/private/donation-points";
import { HomePage } from "../pages/private/home";
import { ProfilePage } from "../pages/private/profile";
import { LandingPageScreen } from "../pages/public/landing-page";
import { LoginScreen } from "../pages/public/login";

export const routerPrivate = createBrowserRouter([
	{
		path: "/home",
		element: <HomePage />,
	},
	{
		path: "*",
		element: <Navigate to="/home" replace />,
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
		path: "*",
		element: <Navigate to="/login" replace />,
	},
]);
