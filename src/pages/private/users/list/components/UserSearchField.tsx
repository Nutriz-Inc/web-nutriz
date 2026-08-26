import { ChevronDown, Search, X } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { USER_SEARCH_FIELDS, type UserSearchFieldKey } from "../constants";

type UserSearchFieldProps = {
	field: UserSearchFieldKey;
	onFieldChange: (field: UserSearchFieldKey) => void;
	value: string;
	onValueChange: (value: string) => void;
	onClear: () => void;
	className?: string;
};

export function UserSearchField({
	field,
	onFieldChange,
	value,
	onValueChange,
	onClear,
	className,
}: UserSearchFieldProps) {
	const atual =
		USER_SEARCH_FIELDS.find((opcao) => opcao.key === field) ??
		USER_SEARCH_FIELDS[0];

	return (
		<div
			className={cn(
				"flex h-[43px] w-full min-w-0 items-center rounded-card-sm border border-line bg-surface focus-within:border-blue-deep",
				className,
			)}
		>
			<DropdownMenu>
				<DropdownMenuTrigger className="flex h-full shrink-0 items-center gap-1.5 rounded-l-card-sm border-r border-line px-3.5 text-[14px] font-semibold text-ink-2 outline-none transition-colors hover:bg-surface-2 focus-visible:bg-surface-2">
					{atual.label}
					<ChevronDown className="size-4 shrink-0 text-ink-3" aria-hidden />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					{USER_SEARCH_FIELDS.map((opcao) => (
						<DropdownMenuItem
							key={opcao.key}
							onSelect={() => onFieldChange(opcao.key)}
						>
							{opcao.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<Search
				className="ml-3 size-[18px] shrink-0 text-ink-3"
				aria-hidden="true"
			/>
			<input
				value={value}
				onChange={(evento) => onValueChange(evento.target.value)}
				placeholder={atual.placeholder}
				aria-label={atual.placeholder}
				className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-[15px] text-ink outline-none placeholder:text-ink-3"
			/>

			{value && (
				<button
					type="button"
					onClick={onClear}
					aria-label="Limpar busca"
					className="mr-2 flex size-8 shrink-0 items-center justify-center rounded-full text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink-2"
				>
					<X className="size-4" />
				</button>
			)}
		</div>
	);
}
