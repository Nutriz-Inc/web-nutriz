import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { HomePage } from "../pages/private/home";
import { LandingPageScreen } from "../pages/public/landing-page";
import { LoginScreen } from "../pages/public/login";

// A EVA deixou de ser rota de pagina inteira: agora e um widget flutuante
// global (EvaWidget em App.tsx), disponivel em qualquer pagina permitida.
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
