import { ChevronRight, Mail, Phone, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { UserStatusBadge } from "@/components/full/UserStatusBadge";
import { getInitials } from "@/components/layout/utils";
import type { User } from "@/services/types/i-user";
import { formatPhoneNumber } from "@/utils/formatter";
import { USER_TYPE_LABEL } from "@/utils/user";

type Props = {
	user: User;
};

export function UserRow({ user }: Props) {
	const isActive = !user.removed_at;

	return (
		<Link
			to={`/usuarios/${user.id_user}`}
			className="grid grid-cols-[1.6fr_1.4fr_1.1fr_1fr_1fr] items-center gap-4 border-b border-[#eef1f5] px-6 py-4 transition-colors last:border-b-0 hover:bg-[#f7f9fb]"
		>
			{" "}
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
				<Phone className="size-4 shrink-0 text-[#9aa9ba]" />
				<span className="truncate">{formatPhoneNumber(user.phone_number)}</span>
			</div>
			<div className="flex items-center gap-2 text-[14px] text-[#3d4b5c]">
				<Tag className="size-4 shrink-0 text-[#9aa9ba]" />
				<span className="truncate">{USER_TYPE_LABEL[user.type]}</span>
			</div>
			<div className="flex items-center justify-between gap-2">
				<UserStatusBadge isActive={isActive} />
				<ChevronRight className="size-5 shrink-0 text-[#9aa9ba]" />
			</div>
		</Link>
	);
}
