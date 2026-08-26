import { motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccessibilityControls } from "@/components/full/AccessibilityControls";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setAppMenuOpen } from "@/pages/private/eva/widget/eva-widget-bus";
import { NAV_LINKS } from "../constants";
import { useScrollToSection } from "../hooks/use-scroll-to-section";
import { LandingDrawer } from "./LandingDrawer";
import { Wordmark } from "./Wordmark";

export function LandingHeader() {
	const navigate = useNavigate();
	const scrollToSection = useScrollToSection();
	const shouldReduceMotion = useReducedMotion();
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 16);
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setAppMenuOpen(menuOpen);
		return () => setAppMenuOpen(false);
	}, [menuOpen]);

	function handleNavClick(targetId: string) {
		setMenuOpen(false);
		scrollToSection(targetId);
	}

	const entrance = shouldReduceMotion
		? {}
		: {
				initial: { y: -24, opacity: 0 },
				animate: { y: 0, opacity: 1 },
				transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
			};

	return (
		<motion.header
			{...entrance}
			className={cn(
				"pt-safe fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
				scrolled
					? "border-white/10 bg-blue-deep-fill"
					: "border-transparent bg-transparent",
			)}
		>
			<div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-5 sm:px-6 lg:px-8">
				<button
					type="button"
					onClick={() => scrollToSection("topo")}
					className="rounded-2xl focus-visible:ring-3 focus-visible:ring-mint/60"
					aria-label="Nutriz — início"
				>
					<Wordmark className="h-6" />
				</button>

				<nav
					aria-label="Navegação principal"
					className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1.5 backdrop-blur-sm lg:flex"
				>
					{NAV_LINKS.map((link) => (
						<button
							key={link.targetId}
							type="button"
							onClick={() => handleNavClick(link.targetId)}
							className="rounded-full px-4 py-2 text-[14px] font-medium text-blue-tint-2 transition-colors hover:bg-white/15 hover:text-white focus-visible:ring-3 focus-visible:ring-mint/60"
						>
							{link.label}
						</button>
					))}
				</nav>

				<div className="hidden items-center gap-2 lg:flex">
					<AccessibilityControls tom="escuro" className="mr-1" />
					<button
						type="button"
						onClick={() => navigate("/login")}
						className="inline-flex h-11 items-center rounded-full border border-white/15 bg-white/10 px-5 text-[14px] font-semibold text-white transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-mint/60"
					>
						Login
					</button>
					<Button
						onClick={() => navigate("/registro")}
						className="h-11 rounded-full bg-surface-on-fill px-6 text-[14px] font-semibold text-ink-on-fill hover:bg-blue-tint-2"
					>
						Cadastrar-se
					</Button>
				</div>

				<div className="flex shrink-0 items-center gap-1.5 lg:hidden">
					<AccessibilityControls tom="escuro" />

					<button
						type="button"
						onClick={() => setMenuOpen(true)}
						aria-label="Abrir menu"
						aria-expanded={menuOpen}
						className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-mint/60"
					>
						<Menu className="size-[18px]" aria-hidden="true" />
					</button>
				</div>
			</div>

			<LandingDrawer
				open={menuOpen}
				onOpenChange={setMenuOpen}
				onNavigate={handleNavClick}
			/>
		</motion.header>
	);
}
