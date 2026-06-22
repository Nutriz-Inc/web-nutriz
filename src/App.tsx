import "./App.css";
import { RouterProvider } from "react-router-dom";
import { publicRouter, routerPrivate } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./hooks/use-auth";
import { useMemo } from "react";

function App() {
	const { isAuthenticated } = useAuth();

	const routes = useMemo(() => {
		return isAuthenticated ? routerPrivate : publicRouter;
	}, [isAuthenticated]);

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
				<RouterProvider router={routes} />
		</QueryClientProvider>
	);
}

export default App;