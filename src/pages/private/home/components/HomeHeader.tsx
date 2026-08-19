import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import NutrizLogo from "@/assets/images/nutriz-logo.svg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { getHome } from "@/utils/routes";

type HomeHeaderProps = {
	onOpenMenu: () => void;
};

export function HomeHeader({ onOpenMenu }: HomeHeaderProps) {
	const { auth } = useAuth();

	return (
		<header className="flex items-center justify-between gap-4 py-5 sm:py-6">
			<Link
				to={getHome(auth?.type)}
				className="min-w-0 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-blue-bright/50"
				aria-label="Ir para a página inicial"
			>
				<img
					src={NutrizLogo}
					alt="Nutriz"
					className="h-6 w-auto select-none sm:h-7"
				/>
			</Link>

			<Button
				type="button"
				variant="ghost"
				size="icon-pill"
				onClick={onOpenMenu}
				aria-label="Abrir menu"
				className="text-blue-deep hover:bg-blue-tint hover:text-blue-deep"
			>
				<Menu />
			</Button>
		</header>
	);
}
