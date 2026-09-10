import { ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
		<Button
			variant="neutral"
			size="pill"
			type="button"
			onClick={onClick}
			disabled={loading}
			className="mx-auto w-full text-blue-deep lg:w-fit"
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
		</Button>
	);
}
