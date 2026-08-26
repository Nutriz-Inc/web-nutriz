import { RotateCcw, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useEffect, useState } from "react";
import { Segmented } from "@/components/ui/segmented";
import { useAccessibility } from "@/context/accessibility-context";
import type {
	PreferenciaMovimento,
	PreferenciaTema,
} from "@/utils/accessibility-storage";

type AccessibilityPanelProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

const TEMAS: { key: PreferenciaTema; label: string }[] = [
	{ key: "sistema", label: "Sistema" },
	{ key: "claro", label: "Claro" },
	{ key: "escuro", label: "Escuro" },
];

const MOVIMENTOS: { key: PreferenciaMovimento; label: string }[] = [
	{ key: "sistema", label: "Sistema" },
	{ key: "reduzido", label: "Reduzido" },
];

const FONTES: { key: "padrao" | "dislexia"; label: string }[] = [
	{ key: "padrao", label: "Padrão" },
	{ key: "dislexia", label: "Dislexia" },
];

/**
 * Painel de acessibilidade.
 *
 * Radix Dialog, e nao um menu proprio: ele ja entrega prender o foco dentro
 * do painel, devolver o foco ao botao ao fechar, fechar no ESC e marcar o
 * resto da pagina como inerte para o leitor de tela.
 */
export function AccessibilityPanel({
	open,
	onOpenChange,
}: AccessibilityPanelProps) {
	const {
		preferencias,
		temaEfetivo,
		movimentoReduzido,
		definirTema,
		definirMovimento,
		definirFonteDislexia,
		restaurarPadroes,
	} = useAccessibility();

	/*
	 * O leitor de tela precisa ouvir o que mudou: o efeito e visual, e quem nao
	 * enxerga nao teria retorno nenhum ao mexer no controle.
	 */
	const [anuncio, setAnuncio] = useState("");

	useEffect(() => {
		if (!anuncio) {
			return;
		}
		const relogio = window.setTimeout(() => setAnuncio(""), 1200);
		return () => window.clearTimeout(relogio);
	}, [anuncio]);

	const descreveTema =
		preferencias.tema === "sistema"
			? `seguindo o sistema (${temaEfetivo})`
			: preferencias.tema;

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-[80] bg-ink/25" />
				<Dialog.Content
					// O Radix isola o resto da pagina com `aria-hidden` nos irmaos e
					// nao escreve `aria-modal`. Somar o atributo nao custa nada e
					// cobre leitores que ainda dependem dele.
					aria-modal="true"
					className="rounded-card fixed inset-x-0 bottom-0 z-[85] flex max-h-[85dvh] flex-col overflow-y-auto border border-line bg-surface p-5 shadow-lift outline-none sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[380px] sm:p-6"
				>
					<div className="flex items-start justify-between gap-4">
						<div className="min-w-0">
							<Dialog.Title className="font-display text-[18px] font-extrabold text-ink">
								Acessibilidade
							</Dialog.Title>
							<Dialog.Description className="mt-1 text-[13px] leading-[19px] text-ink-2">
								Ajuste a exibição do jeito que for melhor para você. Fica salvo
								neste aparelho.
							</Dialog.Description>
						</div>

						<Dialog.Close
							aria-label="Fechar acessibilidade"
							className="flex size-11 shrink-0 items-center justify-center rounded-full text-ink-2 outline-none transition-colors hover:bg-surface-3 focus-visible:ring-3 focus-visible:ring-blue-bright/50"
						>
							<X className="size-5" />
						</Dialog.Close>
					</div>

					<div className="mt-5 flex flex-col gap-5">
						<Campo
							titulo="Tema"
							descricao="Escuro cansa menos a vista à noite e na madrugada."
						>
							<Segmented
								fullWidth
								size="lg"
								options={TEMAS}
								value={preferencias.tema}
								onChange={(valor) => {
									definirTema(valor);
									setAnuncio(
										`Tema: ${valor === "sistema" ? "seguindo o sistema" : valor}`,
									);
								}}
								aria-label="Tema da interface"
							/>
						</Campo>

						<Campo
							titulo="Movimento"
							descricao="Reduzido desliga animações e transições da tela inteira."
						>
							<Segmented
								fullWidth
								size="lg"
								options={MOVIMENTOS}
								value={preferencias.movimento}
								onChange={(valor) => {
									definirMovimento(valor);
									setAnuncio(
										`Movimento: ${valor === "sistema" ? "seguindo o sistema" : "reduzido"}`,
									);
								}}
								aria-label="Movimento e animações"
							/>
						</Campo>

						<Campo
							titulo="Fonte"
							descricao="A opção para dislexia troca a letra e abre o espaçamento."
						>
							<Segmented
								fullWidth
								size="lg"
								options={FONTES}
								value={preferencias.fonteDislexia ? "dislexia" : "padrao"}
								onChange={(valor) => {
									definirFonteDislexia(valor === "dislexia");
									setAnuncio(
										valor === "dislexia"
											? "Fonte para dislexia ativada"
											: "Fonte padrão",
									);
								}}
								aria-label="Fonte do texto"
							/>
						</Campo>
					</div>

					<button
						type="button"
						onClick={() => {
							restaurarPadroes();
							setAnuncio("Preferências restauradas para o padrão do sistema");
						}}
						className="mt-6 flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface text-[14px] font-semibold text-ink-2 outline-none transition-colors hover:bg-surface-3 focus-visible:ring-3 focus-visible:ring-blue-bright/50"
					>
						<RotateCcw className="size-4" aria-hidden="true" />
						Voltar ao padrão
					</button>

					<p className="mt-3 text-center text-[12px] text-ink-3">
						Agora: tema {descreveTema} · movimento{" "}
						{movimentoReduzido ? "reduzido" : "normal"}
					</p>

					{/*
					 * `role="status"` avisa sem interromper o que o leitor estiver
					 * lendo; `sr-only` porque o retorno visual ja e a propria tela.
					 */}
					<span role="status" aria-live="polite" className="sr-only">
						{anuncio}
					</span>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

function Campo({
	titulo,
	descricao,
	children,
}: {
	titulo: string;
	descricao: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-2">
			<p className="text-[14px] font-bold text-ink">{titulo}</p>
			{children}
			<p className="text-[12px] leading-[17px] text-ink-3">{descricao}</p>
		</div>
	);
}
