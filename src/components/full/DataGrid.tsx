import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DataGridItem = {
	chave: string;
	conteudo: ReactNode;
};

type Colunas = 1 | 2 | 3 | 4;

type DataGridProps = {
	itens: DataGridItem[];
	colunas: Colunas;
	colunasMobile?: Colunas;
	className?: string;
	celulaClassName?: string;
};

const GRID_MOBILE: Record<Colunas, string> = {
	1: "grid-cols-1",
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4",
};

const GRID_DESKTOP: Record<Colunas, string> = {
	1: "lg:grid-cols-1",
	2: "lg:grid-cols-2",
	3: "lg:grid-cols-3",
	4: "lg:grid-cols-4",
};

export function DataGrid({
	itens,
	colunas,
	colunasMobile = 2,
	className,
	celulaClassName,
}: DataGridProps) {
	return (
		<div
			className={cn(
				"grid border-line",
				GRID_MOBILE[colunasMobile],
				GRID_DESKTOP[colunas],
				className,
			)}
		>
			{itens.map((item, indice) => (
				<div
					key={item.chave}
					className={cn(
						"border-line",
						indice % colunasMobile !== 0 ? "border-l" : "",
						indice >= colunasMobile ? "border-t" : "",
						indice % colunas !== 0 ? "lg:border-l" : "lg:border-l-0",
						indice >= colunas ? "lg:border-t" : "lg:border-t-0",
						celulaClassName,
					)}
				>
					{item.conteudo}
				</div>
			))}
		</div>
	);
}
