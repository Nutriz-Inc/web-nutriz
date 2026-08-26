import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AccessibilityControls } from "@/components/full/AccessibilityControls";
import { NutrizLogo } from "@/components/full/NutrizLogo";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { setAppMenuOpen } from "@/pages/private/eva/widget/eva-widget-bus";
import { EnumUserType } from "@/services/types/i-user";
import { getHome } from "@/utils/routes";
import { AppDrawer } from "./AppDrawer";
import { UserMenu } from "./UserMenu";
import { getUserMenu } from "./utils";

type AppHeaderProps = {
	showMenu?: boolean;
	className?: string;
};

export function AppHeader({ showMenu = true, className }: AppHeaderProps) {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { auth, isAuthenticated } = useAuth();

	useEffect(() => {
		setAppMenuOpen(drawerOpen);
		return () => setAppMenuOpen(false);
	}, [drawerOpen]);

	const logoHref = isAuthenticated ? getHome(auth?.type) : "/";
	const comNavegacao = showMenu && !!auth;

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
						<NutrizLogo className="h-6 sm:h-7" />
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
						<div className="flex shrink-0 items-center gap-1.5">
							<AccessibilityControls className="mr-1 hidden lg:flex" />
							<UserMenu />

							<AccessibilityControls className="lg:hidden" />

							<button
								type="button"
								onClick={() => setDrawerOpen(true)}
								aria-label="Abrir menu de navegação"
								aria-expanded={drawerOpen}
								className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-ink-2 outline-none transition-colors hover:bg-surface-3 focus-visible:ring-3 focus-visible:ring-blue-bright/60 lg:hidden"
							>
								<Menu className="size-[18px]" aria-hidden="true" />
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
