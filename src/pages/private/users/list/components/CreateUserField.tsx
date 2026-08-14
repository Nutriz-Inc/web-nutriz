import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CreateUserFieldProps = {
	id: string;
	label: string;
	icon: LucideIcon;
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
};

export function CreateUserField({
	id,
	label,
	icon: Icon,
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
}: CreateUserFieldProps) {
	return (
		<div className="flex w-full flex-col gap-1.5">
			<label htmlFor={id} className="text-[13px] font-semibold text-[#1f2937]">
				{label}
				{optional && (
					<span className="font-normal text-[#9ca3af]"> (opcional)</span>
				)}
			</label>
			<div
				className={cn(
					"flex w-full items-center gap-2.5 rounded-[10px] bg-[#f3f4f6] px-3.5 py-[13px]",
					error && "ring-1 ring-red-400",
				)}
			>
				<Icon className="size-4 shrink-0 text-[#9ca3af]" />
				<input
					id={id}
					value={value}
					onChange={(event) => onChange(event.target.value)}
					placeholder={placeholder}
					type={type}
					inputMode={inputMode}
					autoComplete={autoComplete}
					maxLength={maxLength}
					aria-invalid={!!error}
					aria-describedby={error ? `${id}-error` : undefined}
					className="w-full bg-transparent text-[14px] text-[#1f2937] outline-none placeholder:text-[#9ca3af]"
				/>
				{trailing}
			</div>
			{error && (
				<p id={`${id}-error`} className="text-[12px] text-red-500">
					{error}
				</p>
			)}
		</div>
	);
}
