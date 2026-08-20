import { Plus } from "lucide-react";

type AddBabyButtonProps = {
	onClick: () => void;
};

export function AddBabyButton({ onClick }: AddBabyButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex items-center gap-1 rounded-full border border-blue-bright/25 bg-blue-bright/18 px-3 py-1.5 text-[13px] font-semibold text-blue-deep/88"
		>
			<Plus className="size-[15px]" />
			Novo
		</button>
	);
}
