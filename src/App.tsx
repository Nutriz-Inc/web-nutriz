import "./App.css";
import { RouterProvider } from "react-router-dom";
import { publicRouter, routerPrivate } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./hooks/use-auth";
import { useMemo } from "react";

const queryClient = new QueryClient();

function App() {
	const { isAuthenticated } = useAuth();

	const routes = useMemo(() => {
		return isAuthenticated ? routerPrivate : publicRouter;
	}, [isAuthenticated]);

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={routes} />
		</QueryClientProvider>
	);
}

export default App;
