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
			/*
			 * Recarga em segundo plano que falha nao vira alerta.
			 *
			 * As telas de doacao se recarregam sozinhas de poucos em poucos
			 * segundos (ver `utils/live-query.ts`). Sem esta guarda, uma queda de
			 * rede vira um toast de erro a cada ciclo, por cima de uma tela que
			 * continua mostrando o ultimo dado bom. O alerta fica so para a
			 * primeira carga, quando nao ha nada na tela para a pessoa ler.
			 */
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

	// Expoe o router ativo para o widget da EVA (fora do RouterProvider)
	// navegar e observar a rota atual.
	useEffect(() => {
		registerAppRouter(routes);
	}, [routes]);

	// Barra de status do celular acompanhando o fundo da tela atual.
	useThemeColor(isAuthenticated);

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				key={isAuthenticated ? "private" : "public"}
				router={routes}
			/>
			<EvaWidget />
			<Toaster position="bottom-right" richColors />
		</QueryClientProvider>
	);
}

export default App;
