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
					<p className="text-[12px] font-bold text-[#1e4976]">{label}</p>
					<p className="text-[12px] text-[#5a7a9a]">{shownValue || "—"}</p>
				</div>
				<div className="flex size-4 shrink-0 items-center justify-center rounded-[4px] bg-[#387ccd]/15">
					<Lock className="size-[9px] text-[#387ccd]" />
				</div>
			</div>
		);
	}

	if (isEditing) {
		return (
			<div className="flex flex-col gap-1.5 px-3 py-3">
				<p className="text-[12px] font-bold text-[#1e4976]">{label}</p>
				<input
					ref={inputRef}
					type={type}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onBlur={() => setIsEditing(false)}
					onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
					placeholder={placeholder}
					inputMode={inputMode}
					className="h-[30px] w-full rounded-lg border-[1.5px] border-[#387ccd]/80 bg-white px-3 text-[12px] text-[#1a1d23] outline-none placeholder:text-[#888]/60"
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
				<p className="text-[12px] font-bold text-[#1e4976]">{label}</p>
				<p className="text-[12px] text-[#1a1d23]">
					{shownValue || placeholder || "—"}
				</p>
			</div>
			<Pencil className="size-3.5 shrink-0 text-[#387ccd]" />
		</button>
	);
}
