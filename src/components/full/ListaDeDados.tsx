import { ChevronRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ColunaDaLista<Item> = {
	chave: string;
	titulo: string;
	largura: string;
	papel?: "principal" | "situacao" | "dado";
	alinhar?: "inicio" | "fim";
	ocultarNoCelular?: boolean;
	celula: (item: Item) => ReactNode;
};

type ListaDeDadosProps<Item> = {
	itens: Item[];
	colunas: ColunaDaLista<Item>[];
	chaveDoItem: (item: Item) => string;
	aoAbrir?: (item: Item) => void;
	rotuloDoItem: (item: Item) => string;
	vazio?: ReactNode;
	className?: string;
};

export function ListaDeDados<Item>({
	itens,
	colunas,
	chaveDoItem,
	aoAbrir,
	rotuloDoItem,
	vazio,
	className,
}: ListaDeDadosProps<Item>) {
	const trilhas = `${colunas.map((coluna) => coluna.largura).join(" ")} 1.25rem`;
	const estiloDaGrade = { "--colunas": trilhas } as CSSProperties;

	return (
		<div
			className={cn(
				"overflow-hidden rounded-card-sm border border-line bg-surface",
				className,
			)}
		>
			<div
				aria-hidden="true"
				style={estiloDaGrade}
				className="hidden gap-4 border-b border-line bg-surface-2 px-5 py-3 text-rotulo font-semibold uppercase tracking-[0.06em] text-ink-2 lg:grid lg:[grid-template-columns:var(--colunas)]"
			>
				{colunas.map((coluna) => (
					<span
						key={coluna.chave}
						className={cn(coluna.alinhar === "fim" && "text-right")}
					>
						{coluna.titulo}
					</span>
				))}
			</div>

			{itens.length === 0 ? (
				vazio
			) : (
				<ul className="divide-y divide-line">
					{itens.map((item) => {
						const conteudo = colunas.map((coluna) => {
							const papel = coluna.papel ?? "dado";

							if (papel === "principal") {
								return (
									<div
										key={coluna.chave}
										className="order-1 min-w-0 lg:order-none"
									>
										{coluna.celula(item)}
									</div>
								);
							}

							if (papel === "situacao") {
								return (
									<div
										key={coluna.chave}
										className="order-2 flex justify-end lg:order-none lg:justify-start"
									>
										{coluna.celula(item)}
									</div>
								);
							}

							return (
								<div
									key={coluna.chave}
									className={cn(
										"order-3 flex min-w-0 flex-col gap-0.5 lg:order-none",
										coluna.alinhar === "fim" && "lg:items-end lg:text-right",
										coluna.ocultarNoCelular && "hidden lg:flex",
									)}
								>
									<span className="text-rotulo text-ink-3 lg:sr-only">
										{coluna.titulo}
									</span>
									<span className="truncate text-apoio text-ink tabular-nums">
										{coluna.celula(item)}
									</span>
								</div>
							);
						});

						const classesDaLinha =
							"grid w-full grid-cols-2 items-start gap-x-4 gap-y-3 px-4 py-4 text-left lg:items-center lg:gap-y-0 lg:px-5 lg:py-3.5 lg:[grid-template-columns:var(--colunas)]";

						return (
							<li key={chaveDoItem(item)}>
								{aoAbrir ? (
									<button
										type="button"
										onClick={() => aoAbrir(item)}
										aria-label={rotuloDoItem(item)}
										style={estiloDaGrade}
										className={cn(
											classesDaLinha,
											"group transition-colors duration-150 hover:bg-surface-2 focus-visible:bg-surface-2 active:bg-surface-3",
										)}
									>
										{conteudo}
										<ChevronRight
											aria-hidden="true"
											className="hidden size-5 text-ink-3 transition-transform duration-150 ease-out group-hover:translate-x-0.5 lg:block"
										/>
									</button>
								) : (
									<div style={estiloDaGrade} className={classesDaLinha}>
										{conteudo}
									</div>
								)}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
