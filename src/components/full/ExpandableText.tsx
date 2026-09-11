import { Maximize2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	CLASSE_SHEET_CONTEUDO,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Props = {
	texto: string;
	titulo: string;
	linhas?: 2 | 3 | 4 | 5 | 6;
	className?: string;
	rotulo?: string;
};

const CORTE = {
	2: "line-clamp-2",
	3: "line-clamp-3",
	4: "line-clamp-4",
	5: "line-clamp-5",
	6: "line-clamp-6",
} as const;

export function ExpandableText({
	texto,
	titulo,
	linhas = 4,
	className,
	rotulo = "Ver texto completo",
}: Props) {
	const referencia = useRef<HTMLParagraphElement>(null);
	const [aberto, setAberto] = useState(false);
	const [transborda, setTransborda] = useState(false);

	const medir = useCallback(() => {
		const elemento = referencia.current;

		if (!elemento) return;

		setTransborda(elemento.scrollHeight > elemento.clientHeight + 1);
	}, []);

	useEffect(() => {
		medir();

		const elemento = referencia.current;

		if (!elemento || typeof ResizeObserver === "undefined") return;

		const observador = new ResizeObserver(medir);
		observador.observe(elemento);

		return () => observador.disconnect();
	}, [medir]);

	return (
		<div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
			<p
				ref={referencia}
				className={cn(
					"whitespace-pre-line break-words text-[13px] leading-relaxed text-ink-2",
					CORTE[linhas],
				)}
			>
				{texto}
			</p>

			{transborda && (
				<button
					type="button"
					onClick={() => setAberto(true)}
					className="flex items-center gap-1.5 self-start rounded-full text-[12px] font-semibold text-blue-deep outline-none transition-colors hover:text-blue-fill focus-visible:ring-4 focus-visible:ring-blue-bright/50"
				>
					{rotulo}
					<Maximize2 className="size-3.5" />
				</button>
			)}

			<Sheet open={aberto} onOpenChange={setAberto}>
				<SheetContent side="bottom" className={CLASSE_SHEET_CONTEUDO}>
					<SheetHeader className="p-0">
						<SheetTitle className="font-display text-[18px] font-extrabold text-blue-deep">
							{titulo}
						</SheetTitle>
					</SheetHeader>

					<p className="overflow-y-auto whitespace-pre-line break-words text-[14px] leading-relaxed text-ink">
						{texto}
					</p>
				</SheetContent>
			</Sheet>
		</div>
	);
}
