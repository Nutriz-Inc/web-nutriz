import { Lock, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FieldProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	editable?: boolean;
	type?: "text" | "date";
	displayValue?: string;
	placeholder?: string;
	inputMode?: "text" | "numeric" | "tel" | "email";
};

export function Field({
	label,
	value,
	onChange,
	editable = true,
	type = "text",
	displayValue,
	placeholder,
	inputMode = "text",
}: FieldProps) {
	const [isEditing, setIsEditing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) inputRef.current?.focus();
	}, [isEditing]);

	const shownValue = displayValue ?? value;

	if (!editable) {
		return (
			<div className="flex items-center justify-between gap-3 px-3 py-3">
				<div className="flex flex-col gap-1">
					<p className="text-[12px] font-bold text-blue-deep">{label}</p>
					<p className="text-[12px] text-ink-2">{shownValue || "—"}</p>
				</div>
				<div className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-blue-bright/15">
					<Lock className="size-[9px] text-blue-bright" />
				</div>
			</div>
		);
	}

	if (isEditing) {
		return (
			<div className="flex flex-col gap-1.5 px-3 py-3">
				<p className="text-[12px] font-bold text-blue-deep">{label}</p>
				<input
					ref={inputRef}
					type={type}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onBlur={() => setIsEditing(false)}
					onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
					placeholder={placeholder}
					inputMode={inputMode}
					className="h-[30px] w-full rounded-lg border-[1.5px] border-blue-bright/80 bg-surface px-3 text-[12px] text-ink outline-none placeholder:text-ink-3/60"
				/>
			</div>
		);
	}

	return (
		<button
			type="button"
			onClick={() => setIsEditing(true)}
			className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
		>
			<div className="flex flex-col gap-1">
				<p className="text-[12px] font-bold text-blue-deep">{label}</p>
				<p className="text-[12px] text-ink">
					{shownValue || placeholder || "—"}
				</p>
			</div>
			<Pencil className="size-3.5 shrink-0 text-blue-bright" />
		</button>
	);
}
