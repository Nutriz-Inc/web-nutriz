import { LoaderCircle } from "lucide-react";

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
				<button
					type="button"
					onClick={onSave}
					disabled={saving}
					aria-busy={saving}
					className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-blue-deep-fill px-8 text-[14px] font-semibold text-white outline-none transition-[background-color,transform] hover:bg-blue-fill focus-visible:ring-3 focus-visible:ring-blue-bright/50 active:scale-[0.98] disabled:opacity-70 motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-auto"
				>
					{saving && (
						<LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
					)}
					Salvar alterações
				</button>

				<button
					type="button"
					onClick={onCancel}
					disabled={saving}
					className="inline-flex h-11 w-full items-center justify-center rounded-full border border-line px-6 text-[14px] font-semibold text-ink-2 outline-none transition-colors hover:bg-surface-3 focus-visible:ring-3 focus-visible:ring-blue-bright/50 disabled:opacity-70 motion-reduce:transition-none sm:w-auto"
				>
					Cancelar
				</button>
			</div>

			<p role="status" aria-live="polite" className="sr-only">
				{saving ? "Salvando alterações" : ""}
			</p>
		</div>
	);
}
