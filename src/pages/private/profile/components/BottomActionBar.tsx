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
		<div className="sticky bottom-0 flex flex-col gap-2 border-t border-[#888]/12 bg-white px-4 py-3">
			<button
				type="button"
				onClick={onSave}
				disabled={saving}
				className="flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-[#00458b] text-[15px] font-semibold text-white disabled:opacity-70"
			>
				{saving && <LoaderCircle className="size-4 animate-spin" />}
				Salvar Alterações
			</button>
			<button
				type="button"
				onClick={onCancel}
				disabled={saving}
				className="flex h-[38px] w-full items-center justify-center rounded-2xl border border-[#e1e7ee] text-[14px] text-[#888] disabled:opacity-70"
			>
				Cancelar
			</button>
		</div>
	);
}
