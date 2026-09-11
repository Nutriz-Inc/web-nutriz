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
import { getErrorMessage } from "./utils/error-message";

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
		onSuccess: (_data, _variables, _context, mutation) => {
			const mensagem = mutation.meta?.sucesso;

			toast.success(
				typeof mensagem === "string" ? mensagem : "Tudo certo por aqui.",
			);
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
