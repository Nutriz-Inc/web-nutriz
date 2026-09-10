import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type BottomActionBarProps = {
	onSave: () => void;
	onCancel: () => void;
	saving?: boolean;
};

export function BottomActionBar({
	onSave,
	onCancel,
	saving,
}: BottomActionBarProps) {
	return (
		<div className="sticky bottom-0 z-20 -mx-4 mt-1 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:border-none lg:bg-transparent lg:px-0 lg:py-2 lg:backdrop-blur-none">
			<div className="flex flex-col gap-2 sm:flex-row-reverse sm:items-center sm:justify-start sm:gap-3">
				<Button
					variant="primary"
					size="pill"
					type="button"
					onClick={onSave}
					disabled={saving}
					aria-busy={saving}
					className="w-full sm:w-auto"
				>
					{saving && (
						<LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
					)}
					Salvar alterações
				</Button>

				<Button
					variant="neutral"
					size="pill"
					type="button"
					onClick={onCancel}
					disabled={saving}
					className="w-full sm:w-auto"
				>
					Cancelar
				</Button>
			</div>

			<p role="status" aria-live="polite" className="sr-only">
				{saving ? "Salvando alterações" : ""}
			</p>
		</div>
	);
}
