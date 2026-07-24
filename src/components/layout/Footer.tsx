export function Footer() {
	return (
		<footer className="bg-[#00458b]">
			<div className="flex flex-col items-center gap-2 max-w-[1440px] mx-auto px-5 py-6 text-center lg:flex-row lg:items-center lg:justify-between lg:px-20 lg:py-8 lg:text-left">
				<div className="flex items-center gap-2">
					<div className="flex items-center font-extrabold text-[20px]">
						<span className="text-white">nutri</span>
						<span className="text-[#72f2eb]">z</span>
					</div>
					<span className="text-[#c9dcef] text-[12px]">por Lactare</span>
				</div>
				<p className="text-[#c9dcef] text-[13px]">
					Conteúdo educativo validado por rBLH e Fiocruz
				</p>
			</div>
		</footer>
	);
}
