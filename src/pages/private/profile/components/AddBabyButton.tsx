import { Plus } from "lucide-react";

type AddBabyButtonProps = {
	onClick: () => void;
	label?: string;
};

export function AddBabyButton({
	onClick,
	label = "Novo bebê",
}: AddBabyButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-blue-deep-fill px-5 text-[14px] font-semibold text-white outline-none transition-[background-color,transform] hover:bg-blue-fill focus-visible:ring-3 focus-visible:ring-blue-bright/50 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
		>
			<Plus className="size-4" aria-hidden="true" />
			{label}
		</button>
	);
}
