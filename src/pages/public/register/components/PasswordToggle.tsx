import { Eye, EyeOff } from "lucide-react";

type PasswordToggleProps = {
	visible: boolean;
	onToggle: () => void;
};

export function PasswordToggle({ visible, onToggle }: PasswordToggleProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
			className="text-[#a1a1aa] transition-colors hover:text-[#71717a]"
		>
			{visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
		</button>
	);
}
