import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NutrizLogo from "@/assets/images/nutriz-log-alternative.svg";
import { useAuth } from "@/hooks/use-auth";
import { getHome } from "@/utils/routes";
import { AppDrawer } from "./AppDrawer";

export function Header() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { auth } = useAuth();

	return (
		<>
			<header className="bg-[#00458b] sticky top-0 z-10 p-3">
				<div className="relative flex items-center justify-end max-w-[1440px] mx-auto pl-5 pr-4 py-6 lg:pl-20 lg:pr-9">
					<Link
						to={getHome(auth?.type)}
						className="absolute left-1/2 -translate-x-1/2"
						aria-label="Ir para a página inicial"
					>
						<img
							src={NutrizLogo}
							alt="Nutriz"
							className="h-14 w-auto select-none cursor-pointer"
						/>
					</Link>
					<button
						type="button"
						onClick={() => setDrawerOpen(true)}
						aria-label="Abrir menu"
						className="text-white hover:text-white/80 transition-colors"
					>
						<Menu className="size-6" />
					</button>
				</div>
			</header>

			<AppDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
		</>
	);
}
