import { createBrowserRouter, Navigate } from "react-router-dom";
import { LandingPageScreen } from "../pages/public/landing-page";

export const routerPrivate = createBrowserRouter([
	// {
	// 	path: "/",
	// 	element: <Layout />,
	// 	children: [
	// 		{
	// 			path: "/",
	// 			element: <HomePage />,
	// 		},
	// 	],
	// },
	{
        path: "/",
        element: <LandingPageScreen />,
    },
]);

export const publicRouter = createBrowserRouter([
    {
        path: "/",
        element: <LandingPageScreen />,
    },
	// {
	// 	path: "/login",
	// 	element: <LoginScreen />,
	// },

	{
		path: "*",
		element: <Navigate to={`/`} replace />,
	},
]);