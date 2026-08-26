import { LoaderCircle } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

type DeactivateUserSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	userName: string;
	onConfirm: () => void;
	isPending: boolean;
	error?: string;
};

export function DeactivateUserSheet({
	open,
	onOpenChange,
	userName,
	onConfirm,
	isPending,
	error,
}: DeactivateUserSheetProps) {
	return (
		<Sheet
			open={open}
			onOpenChange={(next) => {
				if (isPending) return;
				onOpenChange(next);
			}}
		>
			<SheetContent
				side="bottom"
				className="rounded-t-2xl border-none lg:data-[side=bottom]:inset-x-auto lg:data-[side=bottom]:left-auto lg:data-[side=bottom]:right-8 lg:data-[side=bottom]:bottom-8 lg:data-[side=bottom]:w-[420px] lg:data-[side=bottom]:rounded-2xl lg:data-[side=bottom]:border lg:data-[side=bottom]:border-line lg:data-[side=bottom]:shadow-lift p-2"
			>
				<div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-blue-tint-2 lg:hidden" />

				<SheetHeader className="gap-1 px-5 pb-0 pt-3 text-left">
					<SheetTitle className="text-[14px] font-bold text-ink">
						Desativar usuário
					</SheetTitle>
					<SheetDescription className="text-[11px] text-ink-3">
						Tem certeza que deseja desativar{" "}
						<span className="font-semibold text-ink">{userName}</span>? O
						usuário perderá o acesso à plataforma.
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col gap-3 px-5 pb-6 pt-4">
					{error && <p className="text-[11px] text-red-500">{error}</p>}

					<button
						type="button"
						onClick={onConfirm}
						disabled={isPending}
						className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-danger text-[12px] font-bold text-white transition-opacity disabled:opacity-60"
					>
						{isPending && <LoaderCircle className="size-[15px] animate-spin" />}
						{isPending ? "Desativando..." : "Desativar usuário"}
					</button>

					<button
						type="button"
						onClick={() => onOpenChange(false)}
						disabled={isPending}
						className="flex h-11 w-full items-center justify-center rounded-card-sm border border-line bg-surface text-[12px] font-bold text-ink transition-opacity disabled:opacity-60"
					>
						Cancelar
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
