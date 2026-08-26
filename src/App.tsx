import "./App.css";
import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { SkipLink } from "./components/full/SkipLink";
import { useAuth } from "./hooks/use-auth";
import { useThemeColor } from "./hooks/use-theme-color";
import { registerAppRouter } from "./lib/app-navigation";
import { EvaWidget } from "./pages/private/eva/widget/eva-widget";
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
		onError: (error, query) => {
			if (query.state.data !== undefined) {
				return;
			}

			toast.error(getErrorMessage(error));
		},
	}),
	mutationCache: new MutationCache({
		onSuccess: () => {
			toast.success("Ação realizada com sucesso.");
		},
		onError: (error, _variables, _context, mutation) => {
			if (mutation.meta?.silenciarErro) {
				return;
			}

			toast.error(getErrorMessage(error));
		},
	}),
});

function App() {
	const { isAuthenticated } = useAuth();

	const routes = useMemo(() => {
		return isAuthenticated ? routerPrivate() : publicRouter();
	}, [isAuthenticated]);

	useEffect(() => {
		registerAppRouter(routes);
	}, [routes]);

	useThemeColor(isAuthenticated);

	return (
		<QueryClientProvider client={queryClient}>
			<SkipLink />
			<RouterProvider
				key={isAuthenticated ? "private" : "public"}
				router={routes}
			/>
			<EvaWidget />
			<Toaster position="top-right" richColors />
		</QueryClientProvider>
	);
}

export default App;
