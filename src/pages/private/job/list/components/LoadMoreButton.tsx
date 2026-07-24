import { ChevronDown, Loader2 } from "lucide-react";

type LoadMoreButtonProps = {
	remaining: number;
	loading: boolean;
	onClick: () => void;
};

export function LoadMoreButton({
	remaining,
	loading,
	onClick,
}: LoadMoreButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={loading}
			className="mx-auto flex h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-[#cbdcf0] bg-white px-6 text-[14px] font-semibold text-[#00458b] transition-transform active:scale-[0.98] disabled:opacity-60 lg:w-fit"
		>
			{loading ? (
				<>
					<Loader2 className="size-4 shrink-0 animate-spin" />
					Carregando...
				</>
			) : (
				<>
					<ChevronDown className="size-4 shrink-0" />
					Carregar mais
					{remaining > 0 ? ` (${remaining} restantes)` : ""}
				</>
			)}
		</button>
	);
}
