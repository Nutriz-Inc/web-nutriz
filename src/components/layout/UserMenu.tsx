import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { useAvatarColor } from "@/hooks/use-avatar-color";
import { cn } from "@/lib/utils";
import { USER_TYPE_LABEL } from "@/utils/constants";
import { getInitials } from "./utils";

/**
 * Avatar da nutriz no canto direito do header, com o menu da conta.
 * A API nao expoe foto de perfil, entao o avatar mostra as iniciais.
 */
export function UserMenu() {
	const { auth, handleLogout } = useAuth();
	const { cor } = useAvatarColor(auth?.id_user);

	if (!auth) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					aria-label={`Abrir menu da conta de ${auth.name}`}
					className="flex size-11 shrink-0 items-center justify-center rounded-full outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50"
				>
					<Avatar className="size-9 border border-line">
						<AvatarFallback className={cn(cor.bg, cor.text)}>
							{getInitials(auth.name)}
						</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuLabel>
					<span className="block truncate text-[14px] font-semibold text-ink">
						{auth.name}
					</span>
					<span className="block text-[12px] text-ink-2">
						{USER_TYPE_LABEL[auth.type]}
					</span>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link to="/perfil">
						<User className="size-4 shrink-0" aria-hidden="true" />
						Meu perfil
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem
					onSelect={handleLogout}
					className="text-danger focus:bg-danger-tint focus:text-danger data-[highlighted]:bg-danger-tint data-[highlighted]:text-danger"
				>
					<LogOut className="size-4 shrink-0" aria-hidden="true" />
					Sair da conta
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
