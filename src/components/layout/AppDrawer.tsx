import { ChevronRight, LogOut, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { useAvatarColor } from "@/hooks/use-avatar-color";
import { cn } from "@/lib/utils";
import { EnumUserType } from "@/services/types/i-user";
import { USER_TYPE_LABEL } from "@/utils/constants";
import { getHome } from "@/utils/routes";
import { getInitials, getUserMenu } from "./utils";

type AppDrawerProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

/**
 * Menu lateral do mobile. Existe so abaixo de `lg` — no desktop a navegacao
 * mora na pilula do AppHeader e este Sheet nunca abre.
 *
 * Segue a mesma identidade das telas logadas: topo em gradiente azul da marca
 * (o mesmo `gradient-blue` do hero), cartoes de item com raio `rounded-card-sm`
 * e o item ativo em `blue-tint`, como a pilula do header. O padding do topo e
 * do rodape respeita a safe area do iPhone (ilha dinamica e barra de gestos).
 * Ver docs/design-system.md.
 */
export function AppDrawer({ open, onOpenChange }: AppDrawerProps) {
	const { auth, handleLogout } = useAuth();
	const { cor } = useAvatarColor(auth?.id_user);

	if (!auth) {
		return null;
	}

	const navItems = getUserMenu(auth.type).filter(
		(item) => !item.adminOnly || auth.type === EnumUserType.Admin,
	);

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				showCloseButton={false}
				aria-label="Menu de navegação"
				className="flex flex-col gap-0 bg-canvas p-0 data-[side=right]:w-[86vw] data-[side=right]:max-w-[340px] data-[side=right]:border-l-0 data-[side=right]:sm:max-w-[340px]"
			>
				<SheetHeader className="gradient-blue relative gap-0 p-0 text-white">
					<div className="flex flex-col gap-4 px-5 pb-6 pt-[calc(1.25rem+env(safe-area-inset-top))]">
						<div className="flex items-start justify-between gap-3">
							<span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
								Nutriz
							</span>

							<SheetClose
								aria-label="Fechar menu"
								className="-mr-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white outline-none transition-colors hover:bg-white/25 focus-visible:ring-3 focus-visible:ring-white/40"
							>
								<X className="size-[18px]" aria-hidden="true" />
							</SheetClose>
						</div>

						<div className="flex items-center gap-3">
							<span
								className={cn(
									"flex size-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-[15px] font-bold",
									cor.bg,
									cor.text,
								)}
								aria-hidden="true"
							>
								{getInitials(auth.name)}
							</span>

							<div className="min-w-0">
								<SheetTitle className="truncate text-[16px] font-bold leading-tight text-white">
									{auth.name}
								</SheetTitle>
								<SheetDescription className="text-[12px] text-white/75">
									{USER_TYPE_LABEL[auth.type]}
								</SheetDescription>
							</div>
						</div>
					</div>
				</SheetHeader>

				<nav
					aria-label="Navegação principal"
					className="flex-1 overflow-y-auto px-3 py-4"
				>
					<p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">
						Navegação
					</p>

					<ul className="flex flex-col gap-1">
						{navItems.map((item) => {
							const Icon = item.icon;

							if (item.action) {
								const { action } = item;

								return (
									<li key={item.label}>
										<button
											type="button"
											onClick={() => {
												onOpenChange(false);
												action();
											}}
											className="rounded-card-sm flex w-full items-center gap-3 px-3 py-3 text-left text-[15px] font-medium text-ink-2 outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50"
										>
											<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-blue-deep shadow-soft">
												<Icon className="size-[18px]" aria-hidden="true" />
											</span>
											{item.label}
										</button>
									</li>
								);
							}

							return (
								<li key={item.label}>
									<NavLink
										to={item.to ?? getHome(auth.type)}
										onClick={() => onOpenChange(false)}
										className={({ isActive }) =>
											cn(
												"rounded-card-sm flex items-center gap-3 px-3 py-3 text-[15px] outline-none transition-colors focus-visible:ring-3 focus-visible:ring-blue-bright/50",
												isActive
													? "bg-blue-tint font-semibold text-blue-deep"
													: "font-medium text-ink-2 hover:bg-blue-tint/60 hover:text-blue-deep",
											)
										}
									>
										{({ isActive }) => (
											<>
												<span
													className={cn(
														"flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
														isActive
															? "bg-blue-deep-fill text-white"
															: "bg-surface text-blue-deep shadow-soft",
													)}
												>
													<Icon className="size-[18px]" aria-hidden="true" />
												</span>

												<span className="min-w-0 flex-1 truncate">
													{item.label}
												</span>

												<ChevronRight
													className={cn(
														"size-4 shrink-0",
														isActive ? "text-blue-deep" : "text-ink-3",
													)}
													aria-hidden="true"
												/>
											</>
										)}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className="border-t border-line bg-surface px-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
					<button
						type="button"
						onClick={handleLogout}
						className="rounded-card-sm flex w-full items-center gap-3 px-3 py-3 text-[15px] font-semibold text-danger outline-none transition-colors hover:bg-danger-tint focus-visible:ring-3 focus-visible:ring-danger/40"
					>
						<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-danger-tint text-danger">
							<LogOut className="size-[18px]" aria-hidden="true" />
						</span>
						Sair da conta
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
