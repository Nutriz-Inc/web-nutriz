import { motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "../data/landing-content";
import { useScrollToSection } from "../hooks/use-scroll-to-section";
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
				"fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
				scrolled
					? "border-white/10 bg-[#0a3a87]"
					: "border-transparent bg-transparent",
			)}
		>
			<div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-5 lg:px-8">
				<button
					type="button"
					onClick={() => scrollToSection("topo")}
					className="rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2fd9c5]"
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
							className="rounded-full px-4 py-2 text-[14px] font-medium text-[#c7d6f0] transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2fd9c5]"
						>
							{link.label}
						</button>
					))}
				</nav>

				<div className="hidden items-center gap-2 lg:flex">
					<button
						type="button"
						onClick={() => navigate("/login")}
						className="inline-flex h-11 items-center rounded-full border border-white/15 bg-white/10 px-5 text-[14px] font-semibold text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2fd9c5]"
					>
						Login
					</button>
					<Button
						onClick={() => navigate("/login")}
						className="h-11 rounded-full bg-white px-6 text-[14px] font-semibold text-[#0a3a87] hover:bg-[#eaf0f8]"
					>
						Cadastrar-se
					</Button>
				</div>

				<Sheet open={menuOpen} onOpenChange={setMenuOpen}>
					<SheetTrigger asChild>
						<button
							type="button"
							className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2fd9c5] lg:hidden"
							aria-label="Abrir menu"
						>
							<Menu className="size-6" />
						</button>
					</SheetTrigger>

					<SheetContent side="right" className="w-4/5 max-w-xs bg-white">
						<SheetHeader className="sr-only">
							<SheetTitle>Menu</SheetTitle>
						</SheetHeader>

						<nav
							aria-label="Navegação principal"
							className="flex flex-col gap-1 px-4 pt-14"
						>
							{NAV_LINKS.map((link) => (
								<button
									key={link.targetId}
									type="button"
									onClick={() => handleNavClick(link.targetId)}
									className="cursor-pointer rounded-lg px-3 py-3 text-left text-[15px] font-medium text-[#12294d] transition-colors hover:bg-[#f5f7fb] hover:text-[#0a3a87]"
								>
									{link.label}
								</button>
							))}
						</nav>

						<div className="mt-2 flex flex-col gap-3 border-t border-[#eef2f7] px-4 pt-4">
							<SheetClose asChild>
								<Button
									onClick={() => navigate("/login")}
									className="h-11 w-full cursor-pointer rounded-full border border-[#d0d9e8] bg-white text-[15px] font-semibold text-[#0a3a87] hover:bg-[#f5f7fb]"
								>
									Login
								</Button>
							</SheetClose>
							<SheetClose asChild>
								<Button
									onClick={() => navigate("/login")}
									className="h-11 w-full cursor-pointer rounded-full bg-[#0a3a87] text-[15px] font-semibold text-white hover:bg-[#0e4aa0]"
								>
									Cadastrar-se
								</Button>
							</SheetClose>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</motion.header>
	);
}
