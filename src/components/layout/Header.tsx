import { ChevronLeft, Menu } from "lucide-react";
import { useState } from "react";
import { useMatches, useNavigate } from "react-router-dom";
import { AppDrawer } from "./AppDrawer";

type RouteHandle = {
	title?: string;
};

export function Header() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const navigate = useNavigate();
	const matches = useMatches();

	const title =
		(
			matches.findLast((m) => (m.handle as RouteHandle)?.title)
				?.handle as RouteHandle
		)?.title ?? "Início";

	return (
		<>
			<header className="flex items-center justify-between bg-[#00458B] px-4 py-4 border-b border-white sticky top-0 z-10">
				<button
					type="button"
					onClick={() => navigate("/home")}
					className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white transition"
					aria-label="Voltar para início"
				>
					<ChevronLeft className="h-5 w-5" />
				</button>

				<span className="text-base font-semibold text-white">{title}</span>

				<button
					type="button"
					onClick={() => setDrawerOpen(true)}
					className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-slate-200 transition"
					aria-label="Abrir menu"
				>
					<Menu className="h-5 w-5" />
				</button>
			</header>

			<AppDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
		</>
	);
}
