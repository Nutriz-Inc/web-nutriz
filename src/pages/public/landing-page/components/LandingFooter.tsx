import { useNavigate } from "react-router-dom";
import { FOOTER_COLUMNS, FOOTER_SOCIALS, type FooterLink } from "../constants";
import { useScrollToSection } from "../hooks/use-scroll-to-section";
import { Wordmark } from "./Wordmark";

export function LandingFooter() {
	const navigate = useNavigate();
	const scrollToSection = useScrollToSection();

	const handleLink = (link: FooterLink) => {
		if (link.to) {
			navigate(link.to);
		} else if (link.targetId) {
			scrollToSection(link.targetId);
		}
	};

	return (
		<footer className="bg-[#082f6e] text-[#c7d6f0]">
			<div className="mx-auto w-full max-w-[1200px] px-5 py-14 lg:px-8">
				<div className="flex flex-col gap-10 md:flex-row md:justify-between">
					<div className="max-w-sm">
						<div className="flex items-center gap-2">
							<Wordmark className="h-6" />
							<span className="text-[11px] text-[#9fb6dc]">por Lactare</span>
						</div>

						<p className="mt-4 text-[14px] leading-relaxed text-[#9fb6dc]">
							Conectamos doadoras de leite humano aos bancos de leite para dar a
							bebês prematuros a chance de crescer com saúde.
						</p>

						<div className="mt-5 flex gap-2.5">
							{FOOTER_SOCIALS.map(({ label, Icon }) => (
								<button
									key={label}
									type="button"
									aria-label={`Nutriz no ${label}`}
									className="inline-flex size-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2fd9c5]"
								>
									<Icon className="size-[18px]" />
								</button>
							))}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-10 sm:gap-16">
						{FOOTER_COLUMNS.map((column) => (
							<nav
								key={column.title}
								aria-label={column.title}
								className="flex flex-col gap-3"
							>
								<h3 className="text-[14px] font-bold text-white">
									{column.title}
								</h3>
								{column.links.map((link) => (
									<button
										key={link.label}
										type="button"
										onClick={() => handleLink(link)}
										className="w-fit text-left text-[14px] text-[#9fb6dc] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2fd9c5]"
									>
										{link.label}
									</button>
								))}
							</nav>
						))}
					</div>
				</div>

				<div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-[#9fb6dc] sm:flex-row sm:items-center sm:justify-between">
					<span>© 2026 Nutriz por Lactare</span>
					<span>Conteúdo educativo validado por rBLH e Fiocruz</span>
				</div>
			</div>
		</footer>
	);
}
