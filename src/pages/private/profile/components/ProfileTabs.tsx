import { cn } from "@/lib/utils";

export type ProfileTabKey = "dados" | "bebe";

const TABS: { key: ProfileTabKey; label: string }[] = [
	{ key: "dados", label: "Meus dados" },
	{ key: "bebe", label: "Seu Bebê" },
];

type ProfileTabsProps = {
	value: ProfileTabKey;
	onChange: (value: ProfileTabKey) => void;
};

export function ProfileTabs({ value, onChange }: ProfileTabsProps) {
	return (
		<div className="flex gap-1 rounded-full border border-[#387ccd]/25 bg-[#387ccd]/18 p-1">
			{TABS.map((tab) => {
				const active = tab.key === value;

				return (
					<button
						key={tab.key}
						type="button"
						onClick={() => onChange(tab.key)}
						className={cn(
							"flex-1 rounded-full py-2 text-[13px] transition-colors",
							active
								? "bg-[#00458b] font-bold text-white"
								: "font-medium text-[#387ccd]/55",
						)}
					>
						{tab.label}
					</button>
				);
			})}
		</div>
	);
}
