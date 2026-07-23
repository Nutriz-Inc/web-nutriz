import "./App.css";
import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useAuth } from "./hooks/use-auth";
import { publicRouter, routerPrivate } from "./router";

function getErrorMessage(error: unknown): string {
	const responseMessage = (
		error as { response?: { data?: { message?: string } } }
	)?.response?.data?.message;

	return typeof responseMessage === "string"
		? responseMessage
		: "Ocorreu um erro. Tente novamente.";
}

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	}),
	mutationCache: new MutationCache({
		onSuccess: () => {
			toast.success("Ação realizada com sucesso.");
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	}),
});

function App() {
	const { isAuthenticated } = useAuth();

	const routes = useMemo(() => {
		return isAuthenticated ? routerPrivate() : publicRouter();
	}, [isAuthenticated]);

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				key={isAuthenticated ? "private" : "public"}
				router={routes}
			/>
			<Toaster position="bottom-right" richColors />
		</QueryClientProvider>
	);
}

export default App;
