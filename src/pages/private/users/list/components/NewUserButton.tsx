import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type NewUserButtonProps = {
	onClick: () => void;
	className?: string;
};

/**
 * Acao de criar usuario.
 *
 * Existe em dois lugares da lista, um visivel de cada vez: no celular ela fica
 * ao lado do titulo da pagina (`actionSlot` do `Page`), onde sobra espaco; do
 * `lg` para cima volta para a direita da linha de filtros. Ficar so na linha de
 * filtros custava uma faixa inteira de largura cheia no celular.
 */
export function NewUserButton({ onClick, className }: NewUserButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex h-[43px] shrink-0 items-center justify-center gap-2 rounded-full bg-blue-deep-fill px-4 text-[14px] font-semibold text-white transition-transform hover:bg-blue-fill active:scale-[0.98] sm:px-5",
				className,
			)}
		>
			<Plus className="size-4" />
			Novo usuário
		</button>
	);
}
