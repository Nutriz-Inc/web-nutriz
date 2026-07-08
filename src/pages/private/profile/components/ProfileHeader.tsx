import { getInitials } from "@/components/layout/utils";

type ProfileHeaderProps = {
	name: string;
	email: string;
};

export function ProfileHeader({ name, email }: ProfileHeaderProps) {
	return (
		<div className="flex items-center gap-3 bg-[#f7f9fb] px-4 py-3 lg:bg-transparent lg:px-0 lg:py-0">
			<div className="relative shrink-0">
				<div className="flex size-[73px] items-center justify-center rounded-full bg-[#387ccd]/18 text-[22px] font-bold text-[#00458b]">
					{getInitials(name)}
				</div>
			</div>

			<div className="flex min-w-0 flex-col">
				<p className="truncate text-[16px] font-semibold text-[#1a1d23]">
					{name}
				</p>
				<p className="truncate text-[12px] text-[#888]">{email}</p>
			</div>
		</div>
	);
}
