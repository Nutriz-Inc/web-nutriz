import { Search } from "lucide-react";

type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<div className="relative w-full">
			<Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#9ca3af]" />
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Buscar por nome ou CPF..."
				className="h-[43px] w-full rounded-xl border border-[#e5e7eb] bg-white pl-11 pr-4 text-[15px] text-[#1f2a37] outline-none placeholder:text-[#9ca3af]"
			/>
		</div>
	);
}