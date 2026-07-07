import { Pencil } from "lucide-react";

type EditableFieldProps = {
	label: string;
	value: string;
	placeholder?: string;
	onChange: (value: string) => void;
	inputMode?: "text" | "numeric" | "tel" | "email";
};

export function EditableField({
	label,
	value,
	placeholder,
	onChange,
	inputMode = "text",
}: EditableFieldProps) {
	return (
		<div className="flex flex-col gap-1.5 px-3 py-3">
			<p className="text-[12px] font-bold text-[#1e4976]">{label}</p>
			<div className="relative">
				<input
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					inputMode={inputMode}
					className="h-[30px] w-full rounded-lg border border-[#e6f3ff] bg-white pl-3 pr-8 text-[12px] text-[#1a1d23] outline-none placeholder:text-[#888]/60"
				/>
				<Pencil className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-[#387ccd]" />
			</div>
		</div>
	);
}
