export function SkipLink() {
	return (
		<a
			href="#conteudo"
			onClick={(evento) => {
				const alvo = document.querySelector<HTMLElement>("main");
				if (!alvo) {
					return;
				}
				evento.preventDefault();
				alvo.setAttribute("tabindex", "-1");
				alvo.focus();
				alvo.scrollIntoView({ behavior: "smooth" });
			}}
			className="sr-only rounded-full bg-blue-deep-fill px-5 py-3 text-[14px] font-semibold text-white shadow-lift outline-none focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:ring-3 focus-visible:ring-blue-bright/60"
		>
			Pular para o conteúdo
		</a>
	);
}
