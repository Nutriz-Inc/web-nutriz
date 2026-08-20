import { LocateFixed } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Acao de trocar o endereco da busca. Ficava como icone flutuante no canto do
 * mapa, sem rotulo - ninguem achava. Agora e um botao com texto, acima do mapa.
 */
export function LocateButton({
	onClick,
	className,
}: {
	onClick: () => void;
	className?: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full border border-line bg-white px-5 text-[14px] font-semibold text-blue-deep shadow-soft outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50 sm:w-auto sm:self-end",
				className,
			)}
		>
			<LocateFixed
				className="size-4 shrink-0 text-blue-bright"
				aria-hidden="true"
			/>
			Buscar por CEP ou usar minha localização
		</button>
	);
}
