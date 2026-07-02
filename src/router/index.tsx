import { createBrowserRouter, Navigate } from "react-router-dom";
import { LandingPageScreen } from "../pages/public/landing-page";
import { LoginScreen } from "../pages/public/login";
import { HomePage } from "../pages/private/home";
import { Layout } from "@/components/layout/Layout";

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
			// Add your private routes here
			// For example:
			{
				path: "/test",
				element: <LandingPageScreen />,
			},
		],
	}
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
