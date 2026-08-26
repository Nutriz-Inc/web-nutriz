import { ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { NAV_ICONS, NAV_LINKS } from "../constants";
import { Wordmark } from "./Wordmark";

type LandingDrawerProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onNavigate: (targetId: string) => void;
};

export function LandingDrawer({
	open,
	onOpenChange,
	onNavigate,
}: LandingDrawerProps) {
	const navigate = useNavigate();

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
							<SheetTitle className="text-white">
								<Wordmark className="h-7" />
								<span className="sr-only">Nutriz</span>
							</SheetTitle>

							<SheetClose
								aria-label="Fechar menu"
								className="-mr-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white outline-none transition-colors hover:bg-white/25 focus-visible:ring-3 focus-visible:ring-white/40"
							>
								<X className="size-[18px]" aria-hidden="true" />
							</SheetClose>
						</div>

						<SheetDescription className="text-[13px] text-white/75">
							Doe leite. Multiplique vidas.
						</SheetDescription>
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
						{NAV_LINKS.map((link) => {
							const Icon = NAV_ICONS[link.targetId];

							return (
								<li key={link.targetId}>
									<button
										type="button"
										onClick={() => onNavigate(link.targetId)}
										className="rounded-card-sm flex w-full items-center gap-3 px-3 py-3 text-left text-[15px] font-medium text-ink-2 outline-none transition-colors hover:bg-blue-tint hover:text-blue-deep focus-visible:ring-3 focus-visible:ring-blue-bright/50"
									>
										<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-blue-deep shadow-soft">
											{Icon && (
												<Icon className="size-[18px]" aria-hidden="true" />
											)}
										</span>

										<span className="min-w-0 flex-1 truncate">
											{link.label}
										</span>

										<ChevronRight
											className="size-4 shrink-0 text-ink-3"
											aria-hidden="true"
										/>
									</button>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className="flex flex-col gap-2.5 border-t border-line bg-surface px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
					<button
						type="button"
						onClick={() => {
							onOpenChange(false);
							navigate("/registro");
						}}
						className="flex h-11 w-full items-center justify-center rounded-full bg-blue-deep-fill text-[15px] font-semibold text-white shadow-soft outline-none transition-colors hover:bg-blue-fill focus-visible:ring-3 focus-visible:ring-blue-bright/50"
					>
						Cadastrar-se
					</button>

					<button
						type="button"
						onClick={() => {
							onOpenChange(false);
							navigate("/login");
						}}
						className="flex h-11 w-full items-center justify-center rounded-full border border-line bg-surface text-[15px] font-semibold text-blue-deep outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50"
					>
						Entrar
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
