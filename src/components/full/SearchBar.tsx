import { Search } from "lucide-react";

type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
};

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
	return (
		<div className="relative w-full">
			<Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-ink-3" />
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="h-[43px] w-full rounded-card-sm border border-line bg-white pl-11 pr-4 text-[15px] text-ink outline-none placeholder:text-ink-3"
			/>
		</div>
	);
}
