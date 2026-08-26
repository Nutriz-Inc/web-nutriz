import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NutrizLogo from "@/assets/images/nutriz-logo.svg";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { setAppMenuOpen } from "@/pages/private/eva/widget/eva-widget-bus";
import { EnumUserType } from "@/services/types/i-user";
import { getHome } from "@/utils/routes";
import { AppDrawer } from "./AppDrawer";
import { UserMenu } from "./UserMenu";
import { getUserMenu } from "./utils";

type AppHeaderProps = {
	/**
	 * Navegacao e menu da conta. Ficam ocultos nas telas publicas (cadastro),
	 * onde nao ha sessao e as rotas privadas nem existem no router.
	 */
	showMenu?: boolean;
	className?: string;
};

/**
 * Barra de topo do app, no mesmo formato do header da landing: logo a
 * esquerda, navegacao horizontal numa pilula e o avatar da conta a direita.
 * O fundo continua sendo o da area logada (claro) — so a estrutura e o
 * espacamento sao espelhados. No mobile a navegacao colapsa no AppDrawer,
 * como a landing faz. Ver docs/design-system.md.
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
	const comNavegacao = showMenu && !!auth;

	// Perfil sai da barra porque ja esta no menu do avatar, junto de "Sair".
	const itensNavegacao = auth
		? getUserMenu(auth.type).filter(
				(item) =>
					item.to !== "/perfil" &&
					(!item.adminOnly || auth.type === EnumUserType.Admin),
			)
		: [];

	return (
		<>
			<header
				className={cn("pt-safe relative border-b border-line", className)}
			>
				<div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
					<Link
						to={logoHref}
						className="min-w-0 shrink-0 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-blue-bright/50"
						aria-label="Ir para a página inicial"
					>
						<img
							src={NutrizLogo}
							alt="Nutriz"
							className="h-6 w-auto select-none sm:h-7"
						/>
					</Link>

					{comNavegacao && (
						<nav
							aria-label="Navegação principal"
							className="hidden items-center gap-1 rounded-full border border-line bg-surface/70 px-2 py-1.5 backdrop-blur-sm lg:flex"
						>
							{itensNavegacao.map((item) => (
								<NavLink
									key={item.label}
									to={item.to ?? "/"}
									className={({ isActive }) =>
										cn(
											"rounded-full px-4 py-2 text-[14px] outline-none transition-colors focus-visible:ring-3 focus-visible:ring-blue-bright/50",
											isActive
												? "bg-blue-tint font-semibold text-blue-deep"
												: "font-medium text-ink-2 hover:bg-blue-tint/60 hover:text-blue-deep",
										)
									}
								>
									{item.label}
								</NavLink>
							))}
						</nav>
					)}

					{comNavegacao && (
						<div className="flex shrink-0 items-center gap-1">
							<UserMenu />

							<button
								type="button"
								onClick={() => setDrawerOpen(true)}
								aria-label="Abrir menu de navegação"
								aria-expanded={drawerOpen}
								className="flex size-11 items-center justify-center rounded-full text-blue-deep outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50 lg:hidden"
							>
								<Menu className="size-6" aria-hidden="true" />
							</button>
						</div>
					)}
				</div>
			</header>

			{comNavegacao && (
				<AppDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
			)}
		</>
	);
}
