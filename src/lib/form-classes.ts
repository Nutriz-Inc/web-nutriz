/**
 * Aparência de campo e de botão de formulário, num lugar só. Nasceu dentro da
 * tela de detalhe da rota e subiu para cá quando o formulário de criar rota
 * precisou da mesma linguagem — dois formulários com o mesmo desenho não devem
 * carregar duas cópias da mesma string de classes.
 */

export const CLASSE_CAMPO =
	"w-full resize-y rounded-xl border border-blue-tint bg-surface px-3.5 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-blue-bright disabled:cursor-not-allowed disabled:opacity-60";

export const CLASSE_ROTULO = "text-[13px] font-semibold text-ink";

export const CLASSE_AJUDA = "text-[12px] leading-relaxed text-ink-2";

export const CLASSE_BOTAO_PRIMARIO =
	"flex h-11 items-center justify-center gap-2 rounded-full bg-blue-deep-fill px-6 text-[15px] font-semibold text-white outline-none transition-[transform,background-color] hover:bg-blue-fill focus-visible:ring-3 focus-visible:ring-blue-bright/50 active:scale-[0.98] disabled:opacity-60";

export const CLASSE_BOTAO_SECUNDARIO =
	"flex h-11 items-center justify-center gap-2 rounded-full border border-blue-tint-2 bg-surface px-6 text-[15px] font-semibold text-blue-deep outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50 disabled:opacity-60";

export const CLASSE_BOTAO_PERIGO =
	"flex h-11 items-center justify-center gap-2 rounded-full bg-danger-fill px-6 text-[15px] font-semibold text-white outline-none transition-[transform,background-color] hover:opacity-90 focus-visible:ring-3 focus-visible:ring-danger/40 active:scale-[0.98] disabled:opacity-60";
