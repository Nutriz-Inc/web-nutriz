import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export function Layout() {
	return (
		<div className="mx-auto flex min-h-dvh flex-col bg-canvas font-body text-ink">
			<AppHeader />
			<main
				id="conteudo"
				tabIndex={-1}
				className="mx-auto w-full max-w-[1400px] flex-1 overflow-y-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-6 lg:px-10"
			>
				<Outlet />
			</main>
		</div>
	);
}
