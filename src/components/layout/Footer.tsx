import { NutrizLogo } from "@/components/full/NutrizLogo";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative mt-4 border-t border-blue-tint-2/60">
			<div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
				<div className="flex items-center gap-3">
					<NutrizLogo className="h-6" />
					<span aria-hidden="true" className="h-4 w-px bg-blue-tint-2" />
					<span className="font-display text-sm font-bold text-blue-deep">
						por Lactare
					</span>
				</div>

				<p className="max-w-md text-[0.8125rem] leading-relaxed text-ink-2 lg:text-right">
					Conteúdo educativo validado pela Rede Brasileira de Bancos de Leite
					Humano e pela Fiocruz.
				</p>
			</div>

			<div className="border-t border-blue-tint-2/40">
				<div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 lg:px-10">
					<p className="text-xs text-ink-2">
						© {year} Nutriz · Lactare. Todos os direitos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}
