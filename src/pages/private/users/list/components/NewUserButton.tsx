import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type NewUserButtonProps = {
	onClick: () => void;
	className?: string;
};

export function NewUserButton({ onClick, className }: NewUserButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex h-[43px] shrink-0 items-center justify-center gap-2 rounded-full bg-blue-deep-fill px-4 text-[14px] font-semibold text-white transition-transform hover:bg-blue-fill active:scale-[0.98] sm:px-5",
				className,
			)}
		>
			<Plus className="size-4" />
			Novo usuário
		</button>
	);
}
