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
	trailing?: ReactNode;
	className?: string;
	/** Ajuste fino do input (altura, raio). O login usa campos mais altos. */
	inputClassName?: string;
};

/**
 * Campo de formulario do app: rotulo, input e mensagem de erro em um so
 * desenho. Usado no cadastro e no login. Ver docs/design-system.md.
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
	trailing,
	className,
	inputClassName,
}: FormFieldProps) {
	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<Label htmlFor={id} className="text-sm font-medium text-ink">
				{label}
				{optional && (
					<span className="font-normal text-ink-2"> (opcional)</span>
				)}
			</Label>
			<div className="relative">
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
						"h-[38px] rounded-md bg-white text-sm",
						"focus-visible:border-blue-deep focus-visible:ring-blue-deep/10",
						trailing && "pr-11",
						inputClassName,
					)}
				/>
				{trailing && (
					<span className="absolute inset-y-0 right-3 flex items-center">
						{trailing}
					</span>
				)}
			</div>
			{error && (
				<p id={`${id}-error`} className="text-xs text-danger">
					{error}
				</p>
			)}
		</div>
	);
}
