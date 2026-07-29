export function UsersTableHeader() {
	return (
		<div className="grid grid-cols-[1.6fr_1.6fr_1.2fr_1fr] gap-4 border-b border-[#eef1f5] px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-[#9aa9ba]">
			<span>Usuário</span>
			<span>Email</span>
			<span>CPF</span>
			<span>Perfil</span>
		</div>
	);
}