import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NutrizLogo from "@/assets/images/nutriz-logo.svg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { setAppMenuOpen } from "@/pages/private/eva/widget/eva-widget-bus";
import { getHome } from "@/utils/routes";
import { AppDrawer } from "./AppDrawer";

type AppHeaderProps = {
	/**
	 * Menu do app. Fica oculto nas telas publicas (cadastro), onde nao ha
	 * sessao e o drawer nao teria para onde navegar.
	 */
	showMenu?: boolean;
	className?: string;
};

/**
 * Barra de topo padrao do app, no desenho da home: fundo transparente sobre o
 * canvas da pagina, logo a esquerda e botao de menu circular a direita.
 * Ver docs/design-system.md.
 */
export function AppHeader({ showMenu = true, className }: AppHeaderProps) {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { auth, isAuthenticated } = useAuth();

	// O FAB da EVA e global (montado em App.tsx, fora do RouterProvider) e nao
	// enxerga o drawer. Com o menu aberto ele ficava por cima e sem resposta ao
	// clique, entao o header avisa o widget para se esconder.
	useEffect(() => {
		setAppMenuOpen(drawerOpen);
		return () => setAppMenuOpen(false);
	}, [drawerOpen]);

	// Sem sessao (cadastro), a home privada nao existe no router publico.
	const logoHref = isAuthenticated ? getHome(auth?.type) : "/";

	return (
		<>
			<header className={cn("relative", className)}>
				<div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
					<Link
						to={logoHref}
						className="min-w-0 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-blue-bright/50"
						aria-label="Ir para a página inicial"
					>
						<img
							src={NutrizLogo}
							alt="Nutriz"
							className="h-6 w-auto select-none sm:h-7"
						/>
					</Link>

					{showMenu && (
						<Button
							type="button"
							variant="ghost"
							size="icon-pill"
							onClick={() => setDrawerOpen(true)}
							aria-label="Abrir menu"
							className="text-blue-deep hover:bg-blue-tint hover:text-blue-deep"
						>
							<Menu />
						</Button>
					)}
				</div>
			</header>

			{showMenu && <AppDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />}
		</>
	);
}
