import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { EvaWelcomeScreen } from "../pages/private/eva";
import { EvaChatScreen } from "../pages/private/eva/chat";
import { HomePage } from "../pages/private/home";
import { LandingPageScreen } from "../pages/public/landing-page";
import { LoginScreen } from "../pages/public/login";

export const routerPrivate = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/home",
				element: <HomePage />,
			},
			{
				path: "*",
				element: <Navigate to="/home" replace />,
			},
		],
	},
	{
		path: "/eva",
		element: <EvaWelcomeScreen />,
	},
	{
		path: "/eva/chat",
		element: <EvaChatScreen />,
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
