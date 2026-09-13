import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type GerarRelatorioButtonProps = {
	onGerar: () => void;
	disabled?: boolean;
};

export function GerarRelatorioButton({
	onGerar,
	disabled,
}: GerarRelatorioButtonProps) {
	return (
		<Button
			type="button"
			variant="neutral"
			size="pill"
			onClick={onGerar}
			disabled={disabled}
			className="print:hidden"
		>
			<FileText className="size-4" strokeWidth={1.7} />
			Gerar relatório
		</Button>
	);
}
