import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
	texto: string;
	linhas?: 2 | 3 | 4 | 5 | 6;
	className?: string;
	rotuloMais?: string;
	rotuloMenos?: string;
};

// Tailwind precisa da classe inteira escrita no fonte para gerar o CSS.
const CORTE = {
	2: "line-clamp-2",
	3: "line-clamp-3",
	4: "line-clamp-4",
	5: "line-clamp-5",
	6: "line-clamp-6",
} as const;

/**
 * Texto de tamanho imprevisivel dentro de um cartao. Corta em N linhas e so
 * oferece "ver mais" quando o texto realmente passa disso, para o cartao nao
 * crescer sem limite e esticar o vizinho da mesma faixa.
 */
export function ExpandableText({
	texto,
	linhas = 4,
	className,
	rotuloMais = "Ver mais",
	rotuloMenos = "Ver menos",
}: Props) {
	const referencia = useRef<HTMLParagraphElement>(null);
	const [aberto, setAberto] = useState(false);
	const [transborda, setTransborda] = useState(false);

	const medir = useCallback(() => {
		const elemento = referencia.current;

		if (!elemento) return;

		// So da para medir com o corte aplicado; aberto, altura real e a visivel.
		if (aberto) return;

		setTransborda(elemento.scrollHeight > elemento.clientHeight + 1);
	}, [aberto]);

	useEffect(() => {
		medir();

		const elemento = referencia.current;

		if (!elemento || typeof ResizeObserver === "undefined") return;

		// A largura do cartao muda com a janela: o que cabia em 4 linhas no desktop
		// pode passar disso no celular.
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
					!aberto && CORTE[linhas],
				)}
			>
				{texto}
			</p>

			{(transborda || aberto) && (
				<button
					type="button"
					onClick={() => setAberto((atual) => !atual)}
					aria-expanded={aberto}
					className="flex items-center gap-1 self-start rounded-full text-[12px] font-semibold text-blue-deep outline-none transition-colors hover:text-blue-fill focus-visible:ring-4 focus-visible:ring-blue-bright/50"
				>
					{aberto ? rotuloMenos : rotuloMais}
					<ChevronDown
						className={cn(
							"size-3.5 transition-transform duration-300",
							aberto && "rotate-180",
						)}
					/>
				</button>
			)}
		</div>
	);
}
