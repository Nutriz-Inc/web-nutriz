import {
	BookOpen,
	Droplets,
	Home,
	LogOut,
	MapPin,
	MessageCircle,
	X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { getInitials } from "./utils";

const navItems = [
	{ label: "Início", icon: Home, to: "/home" },
	{ label: "Pontos de Coleta", icon: MapPin, to: "/pontos-de-coleta" },
	{ label: "Minha doação", icon: Droplets, to: "/minha-doacao" },
	{ label: "Conteúdo educativo", icon: BookOpen, to: "/conteudo-educativo" },
	{ label: "EVA — Assistente Virtual", icon: MessageCircle, to: "/eva" },
];

type AppDrawerProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function AppDrawer({ open, onOpenChange }: AppDrawerProps) {
	const { auth, handleLogout } = useAuth();
	const navigate = useNavigate();

	function onLogout() {
		handleLogout();
		navigate("/login");
	}

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				showCloseButton={false}
				className="w-[300px] p-0 flex flex-col gap-0"
			>
				<SheetHeader className="bg-[#1B4FBB] text-white px-5 pt-10 pb-6 relative">
					<SheetClose className="absolute top-4 right-4 text-white/80 hover:text-white transition">
						<X className="h-5 w-5" />
					</SheetClose>
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white font-semibold text-base shrink-0">
							{getInitials(auth?.name)}
						</div>
						<div className="text-left">
							<SheetTitle className="text-white font-semibold text-base leading-tight">
								{auth?.name ?? "Usuário"}
							</SheetTitle>
						</div>
					</div>
				</SheetHeader>

				<nav className="flex-1 py-2 overflow-y-auto">
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<NavLink
								key={item.label}
								to={item.to}
								onClick={() => onOpenChange(false)}
								className={({ isActive }) =>
									cn(
										"flex items-center gap-4 px-5 py-4 text-sm text-slate-700 transition hover:bg-slate-50 border-l-4",
										isActive
											? "border-[#1B4FBB] text-[#1B4FBB] bg-blue-50/60 font-medium"
											: "border-transparent hover:bg-slate-100 hover:text-slate-900",
									)
								}
							>
								<Icon className="h-5 w-5 shrink-0" />
								{item.label}
							</NavLink>
						);
					})}
				</nav>

				<div className="border-t border-slate-200 px-5 py-4">
					<button
						type="button"
						onClick={onLogout}
						className="flex items-center gap-3 text-sm font-medium text-red-500 hover:text-red-600 transition"
					>
						<LogOut className="h-4 w-4" />
						Sair da conta
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
