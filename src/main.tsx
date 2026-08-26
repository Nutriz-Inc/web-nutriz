import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AccessibilityProvider } from "./context/accessibility-context";
import { AuthProvider } from "./context/auth-context";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/*
		 * O provider de acessibilidade fica FORA do App porque o proprio App
		 * chama `useThemeColor`, que le o tema. Estando dentro do return do App
		 * ele nao cobriria o corpo do componente.
		 */}
		<AccessibilityProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</AccessibilityProvider>
	</StrictMode>,
);
