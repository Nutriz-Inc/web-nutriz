import { Moon, Sun, Type } from "lucide-react";
import { useAccessibility } from "@/context/accessibility-context";
import { cn } from "@/lib/utils";

type AccessibilityControlsProps = {
	tom?: "claro" | "escuro";
	className?: string;
};

export function AccessibilityControls({
	tom = "claro",
	className,
}: AccessibilityControlsProps) {
	const { temaEfetivo, preferencias, definirTema, definirFonteDislexia } =
		useAccessibility();

	const escuro = temaEfetivo === "escuro";
	const fonteAtiva = preferencias.fonteDislexia;

	const base = cn(
		"flex size-11 shrink-0 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-3 focus-visible:ring-blue-bright/60 lg:size-10",
		tom === "escuro"
			? "border border-white/15 bg-white/10 text-white hover:bg-white/20"
			: "border border-line text-ink-2 hover:bg-surface-3",
	);

	return (
		<div className={cn("flex items-center gap-1.5", className)}>
			<button
				type="button"
				onClick={() => definirTema(escuro ? "claro" : "escuro")}
				aria-pressed={escuro}
				aria-label={
					escuro ? "Mudar para o tema claro" : "Mudar para o tema escuro"
				}
				title={escuro ? "Tema claro" : "Tema escuro"}
				className={base}
			>
				{escuro ? (
					<Sun className="size-[18px]" aria-hidden="true" />
				) : (
					<Moon className="size-[18px]" aria-hidden="true" />
				)}
			</button>

			<button
				type="button"
				onClick={() => definirFonteDislexia(!fonteAtiva)}
				aria-pressed={fonteAtiva}
				aria-label={
					fonteAtiva
						? "Voltar para a fonte padrão"
						: "Usar fonte de leitura facilitada"
				}
				title={fonteAtiva ? "Fonte padrão" : "Fonte para dislexia"}
				className={cn(
					base,
					fonteAtiva &&
						(tom === "escuro"
							? "border-white/40 bg-white/15"
							: "border-blue-bright bg-blue-tint text-blue-bright"),
				)}
			>
				<Type className="size-[18px]" aria-hidden="true" />
			</button>
		</div>
	);
}
