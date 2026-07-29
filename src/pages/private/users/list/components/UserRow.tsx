import { ChevronRight, IdCard, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { getInitials } from "@/components/layout/utils";
import { cn } from "@/lib/utils";
import { EnumUserType, type User } from "@/services/types/i-user";
import { USER_TYPE_LABEL } from "@/utils/user";

type Props = {
	user: User;
};

const PROFILE_BADGE_STYLE: Record<EnumUserType, string> = {
	[EnumUserType.Admin]: "bg-[#e8f0fe] text-[#00458b]",
	[EnumUserType.Nurse]: "bg-[#ede9fe] text-[#6d28d9]",
	[EnumUserType.Common]: "bg-[#d5f3ea] text-[#0f766e]",
};

function formatCpf(cpf: string) {
	const digits = cpf.replace(/\D/g, "");
	if (digits.length !== 11) return cpf;
	return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function UserRow({ user }: Props) {
	return (
		<Link
			to={`/usuarios/${user.id_user}`}
			className="grid grid-cols-[1.6fr_1.6fr_1.2fr_1fr] items-center gap-4 border-b border-[#eef1f5] px-6 py-4 transition-colors last:border-b-0 hover:bg-[#f7f9fb]"
		>
			<div className="flex items-center gap-3">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d5f3ea] text-[13px] font-bold text-[#00458b]">
					{getInitials(user.name)}
				</div>
				<p className="truncate text-[15px] font-semibold text-[#0e2a45]">
					{user.name}
				</p>
			</div>
			<div className="flex items-center gap-2 text-[14px] text-[#3d4b5c]">
				<Mail className="size-4 shrink-0 text-[#9aa9ba]" />
				<span className="truncate">{user.email}</span>
			</div>
			<div className="flex items-center gap-2 text-[14px] text-[#3d4b5c]">
				<IdCard className="size-4 shrink-0 text-[#9aa9ba]" />
				<span className="truncate">{formatCpf(user.cpf)}</span>
			</div>
			<div className="flex items-center justify-between gap-2">
				<span
					className={cn(
						"whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-semibold",
						PROFILE_BADGE_STYLE[user.type],
					)}
				>
					{USER_TYPE_LABEL[user.type]}
				</span>
				<ChevronRight className="size-5 shrink-0 text-[#9aa9ba]" />
			</div>
		</Link>
	);
}