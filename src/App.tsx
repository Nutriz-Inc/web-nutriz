import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";
import { publicRouter, routerPrivate } from "./router";

const queryClient = new QueryClient();

function App() {
	const { isAuthenticated } = useAuth();

	const routes = useMemo(() => {
		return isAuthenticated ? routerPrivate : publicRouter;
	}, [isAuthenticated]);

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				key={isAuthenticated ? "private" : "public"}
				router={routes}
			/>
		</QueryClientProvider>
	);
}

export default App;
