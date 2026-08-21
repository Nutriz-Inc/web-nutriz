/**
 * Cabecalho das colunas. So existe no desktop: no celular cada usuario e um
 * cartao empilhado, e rotulos de coluna nao teriam a que se referir.
 */
export function UsersTableHeader() {
	return (
		<div className="hidden grid-cols-[1.6fr_1.6fr_1.2fr_1fr] gap-4 border-b border-surface-3 px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-ink-3 lg:grid">
			<span>Usuário</span>
			<span>Email</span>
			<span>CPF</span>
			<span>Perfil</span>
		</div>
	);
}
