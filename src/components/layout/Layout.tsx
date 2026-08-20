import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export function Layout() {
	return (
		<div className="mx-auto flex min-h-screen flex-col bg-canvas font-body text-ink">
			<AppHeader />
			{/*
			 * Mesmo container da home (max-w-[1400px] + gutters 16/24/40) para o
			 * conteudo de todas as telas comecar na mesma margem. Telas que sangram
			 * ate a borda anulam esse padding com -mx-4 sm:-mx-6 lg:-mx-10.
			 */}
			<main className="mx-auto w-full max-w-[1400px] flex-1 overflow-y-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-6 lg:px-10">
				<Outlet />
			</main>
		</div>
	);
}
