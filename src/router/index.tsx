import { createBrowserRouter, Navigate } from "react-router-dom";
import { LandingPageScreen } from "../pages/public/landing-page";
import { LoginScreen } from "../pages/public/login";
import { Layout } from "../components/layout/Layout";
import { HomePage } from "../pages/private/home";
import { EvaWelcomeScreen } from "../pages/private/eva";

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