import { cn } from "@/lib/utils";

export type SegmentedOption<T extends string> = {
	key: T;
	label: string;
};

type SegmentedProps<T extends string> = {
	options: SegmentedOption<T>[];
	value: T;
	onChange: (value: T) => void;
	/** Divide a largura entre as opcoes (abas de tela); por padrao o controle ocupa so o necessario. */
	fullWidth?: boolean;
	/**
	 * `lg` garante alvo de 44px, o minimo de area de toque das WCAG. E opcional
	 * para nao mudar a altura das abas que ja existem pelo app.
	 */
	size?: "md" | "lg";
	className?: string;
	"aria-label"?: string;
};

/**
 * Controle segmentado do app: trilho em azul claro com a opcao ativa em
 * azul-escuro. Um unico desenho para abas de perfil, filtros de status e
 * qualquer alternancia de 2+ opcoes. Ver docs/design-system.md.
 */
export function Segmented<T extends string>({
	options,
	value,
	onChange,
	fullWidth = false,
	size = "md",
	className,
	"aria-label": ariaLabel,
}: SegmentedProps<T>) {
	return (
		<div
			role="tablist"
			aria-label={ariaLabel}
			className={cn(
				"flex w-fit items-center gap-1 rounded-full bg-blue-tint p-1",
				fullWidth && "w-full",
				className,
			)}
		>
			{options.map((option) => {
				const active = option.key === value;

				return (
					<button
						key={option.key}
						type="button"
						role="tab"
						aria-selected={active}
						onClick={() => onChange(option.key)}
						className={cn(
							"shrink-0 whitespace-nowrap rounded-full px-5 text-[13px] font-semibold transition-colors",
							size === "lg" ? "min-h-11 py-2.5" : "py-2",
							fullWidth && "flex-1 shrink",
							active
								? "bg-blue-deep text-white shadow-soft"
								: "text-ink-2 hover:text-ink",
						)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
