import { Segmented, type SegmentedOption } from "@/components/ui/segmented";

export type ProfileTabKey = "dados" | "bebe";

const TABS: SegmentedOption<ProfileTabKey>[] = [
	{ key: "dados", label: "Meus dados" },
	{ key: "bebe", label: "Seu Bebê" },
];

type ProfileTabsProps = {
	value: ProfileTabKey;
	onChange: (value: ProfileTabKey) => void;
};

export function ProfileTabs({ value, onChange }: ProfileTabsProps) {
	return (
		<Segmented
			options={TABS}
			value={value}
			onChange={onChange}
			fullWidth
			aria-label="Seções do perfil"
		/>
	);
}
