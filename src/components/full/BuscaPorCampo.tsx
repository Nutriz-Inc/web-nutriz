import { ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type CampoDeBusca<Chave extends string> = {
	chave: Chave;
	rotulo: string;
	placeholder: string;
};

type BuscaPorCampoProps<Chave extends string> = {
	campos: CampoDeBusca<Chave>[];
	campo: Chave;
	aoTrocarCampo: (campo: Chave) => void;
	valor: string;
	aoMudar: (valor: string) => void;
	className?: string;
};

export function BuscaPorCampo<Chave extends string>({
	campos,
	campo,
	aoTrocarCampo,
	valor,
	aoMudar,
	className,
}: BuscaPorCampoProps<Chave>) {
	const atual = campos.find((opcao) => opcao.chave === campo) ?? campos[0];
	const temEscolha = campos.length > 1;

	return (
		<search
			className={cn(
				"flex h-11 w-full min-w-0 items-center rounded-card-sm border border-line bg-surface transition-colors focus-within:border-blue-bright",
				className,
			)}
		>
			{temEscolha && (
				<DropdownMenu>
					<DropdownMenuTrigger
						aria-label={`Buscar por: ${atual.rotulo}. Trocar campo`}
						className="flex h-full shrink-0 items-center gap-1.5 rounded-l-card-sm border-r border-line px-3.5 text-apoio font-semibold text-ink-2 outline-none transition-colors hover:bg-surface-2 focus-visible:bg-surface-2"
					>
						{atual.rotulo}
						<ChevronDown className="size-4 shrink-0 text-ink-3" aria-hidden />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{campos.map((opcao) => (
							<DropdownMenuItem
								key={opcao.chave}
								onSelect={() => aoTrocarCampo(opcao.chave)}
							>
								{opcao.rotulo}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			)}

			<Search
				className={cn(
					"size-[18px] shrink-0 text-ink-3",
					temEscolha ? "ml-3" : "ml-4",
				)}
				aria-hidden="true"
			/>
			<input
				type="search"
				value={valor}
				onChange={(evento) => aoMudar(evento.target.value)}
				placeholder={atual.placeholder}
				aria-label={atual.placeholder}
				className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-corpo text-ink outline-none placeholder:text-ink-3 [&::-webkit-search-cancel-button]:hidden"
			/>

			{valor && (
				<Button
					variant="ghost"
					size="icon-pill-sm"
					type="button"
					onClick={() => aoMudar("")}
					aria-label="Limpar busca"
					className="mr-1.5 size-8 shrink-0 text-ink-3 hover:bg-surface-2 hover:text-ink-2"
				>
					<X className="size-4" />
				</Button>
			)}
		</search>
	);
}
