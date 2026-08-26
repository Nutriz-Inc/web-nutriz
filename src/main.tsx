import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AccessibilityProvider } from "./context/accessibility-context";
import { AuthProvider } from "./context/auth-context";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AccessibilityProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</AccessibilityProvider>
	</StrictMode>,
);
