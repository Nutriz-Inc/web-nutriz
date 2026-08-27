import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type PasswordToggleProps = {
	visible: boolean;
	onToggle: () => void;
	className?: string;
};

export function PasswordToggle({
	visible,
	onToggle,
	className,
}: PasswordToggleProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
			className={cn(
				"text-ink-2 transition-colors hover:text-ink motion-reduce:transition-none",
				className,
			)}
		>
			{visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
		</button>
	);
}
