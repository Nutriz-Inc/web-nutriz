import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type AddBabyButtonProps = {
	onClick: () => void;
	label?: string;
};

export function AddBabyButton({
	onClick,
	label = "Novo bebê",
}: AddBabyButtonProps) {
	return (
		<Button
			variant="primary"
			size="pill"
			type="button"
			onClick={onClick}
			className="shrink-0"
		>
			<Plus className="size-4" aria-hidden="true" />
			{label}
		</Button>
	);
}
