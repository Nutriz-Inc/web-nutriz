import { Menu } from "lucide-react";
import { useState } from "react";
import NutrizLogo from "@/assets/images/nutriz-log-alternative.svg";
import { AppDrawer } from "./AppDrawer";

export function Header() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<>
			<header className="bg-[#00458b] sticky top-0 z-10">
				<div className="relative flex items-center justify-end max-w-[1440px] mx-auto pl-5 pr-4 py-6 lg:pl-20 lg:pr-9">
					<img
						src={NutrizLogo}
						alt="Nutriz"
						className="absolute left-1/2 -translate-x-1/2 h-14 w-auto select-none"
					/>
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
