import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	error?: string;
	type?: string;
	inputMode?: "text" | "numeric" | "tel" | "email";
	autoComplete?: string;
	maxLength?: number;
	optional?: boolean;
	/** Icone dentro do campo, a esquerda. Puramente visual. */
	leading?: ReactNode;
	/** Acao dentro do campo, a direita (ex.: mostrar/ocultar senha). */
	trailing?: ReactNode;
	className?: string;
};

/**
 * Campo de formulario do app: rotulo, input e mensagem de erro em um so
 * desenho. Usado no cadastro e no login.
 *
 * O campo tem 44px de altura (alvo de toque do design system), fundo
 * `surface-2` para se destacar do cartao branco e anel azul no foco. Com
 * `leading`, o icone fica dentro do campo e o texto recua para nao passar por
 * baixo dele. Ver docs/design-system.md.
 */
export function FormField({
	id,
	label,
	value,
	onChange,
	placeholder,
	error,
	type = "text",
	inputMode = "text",
	autoComplete,
	maxLength,
	optional = false,
	leading,
	trailing,
	className,
}: FormFieldProps) {
	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<Label htmlFor={id} className="text-[13px] font-semibold text-ink-2">
				{label}
				{optional && (
					<span className="font-normal text-ink-3"> (opcional)</span>
				)}
			</Label>

			<div className="relative">
				{leading && (
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-ink-3 [&_svg]:size-[18px]"
					>
						{leading}
					</span>
				)}

				<Input
					id={id}
					type={type}
					value={value}
					onChange={(event) => onChange(event.target.value)}
					placeholder={placeholder}
					inputMode={inputMode}
					autoComplete={autoComplete}
					maxLength={maxLength}
					aria-invalid={!!error}
					aria-describedby={error ? `${id}-error` : undefined}
					className={cn(
						"h-11 rounded-xl border-line bg-surface-2 px-4 text-[15px] text-ink shadow-none",
						"placeholder:text-ink-3/70",
						"focus-visible:border-blue-bright focus-visible:bg-surface focus-visible:ring-blue-bright/25",
						"aria-invalid:border-danger/40 aria-invalid:bg-danger-tint/40 aria-invalid:ring-danger/15",
						leading && "pl-11",
						trailing && "pr-12",
					)}
				/>

				{trailing && (
					<span className="absolute inset-y-0 right-2 flex items-center">
						{trailing}
					</span>
				)}
			</div>

			{error && (
				<p id={`${id}-error`} className="text-[12px] font-medium text-danger">
					{error}
				</p>
			)}
		</div>
	);
}
