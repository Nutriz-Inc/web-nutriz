import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
import { useScrollToSection } from "../hooks/use-scroll-to-section";
import { NAV_ICONS, NAV_LINKS } from "./constants";
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
						onClick={() => navigate("/registro")}
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

					<SheetContent
						side="right"
						showCloseButton={false}
						className="flex w-[300px] flex-col gap-0 bg-white p-0"
					>
						<SheetHeader className="relative bg-[#1B4FBB] px-5 pt-10 pb-6 text-white">
							<SheetClose className="absolute top-4 right-4 text-white/80 transition hover:text-white">
								<X className="h-5 w-5" />
							</SheetClose>
							<SheetTitle className="text-left">
								<Wordmark className="h-7" />
							</SheetTitle>
							<p className="text-left text-[13px] text-white/70">
								Doe leite. Multiplique vidas.
							</p>
						</SheetHeader>

						<nav
							aria-label="Navegação principal"
							className="flex-1 overflow-y-auto py-2"
						>
							{NAV_LINKS.map((link) => {
								const Icon = NAV_ICONS[link.targetId];
								return (
									<button
										key={link.targetId}
										type="button"
										onClick={() => handleNavClick(link.targetId)}
										className="flex w-full items-center gap-4 border-l-4 border-transparent px-5 py-4 text-left text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
									>
										{Icon && <Icon className="h-5 w-5 shrink-0" />}
										{link.label}
									</button>
								);
							})}
						</nav>

						<div className="flex flex-col gap-3 border-t border-slate-200 p-4">
							<SheetClose asChild>
								<Button
									onClick={() => navigate("/login")}
									className="h-11 w-full cursor-pointer rounded-full border border-[#d0d9e8] bg-white text-[15px] font-semibold text-[#1B4FBB] hover:bg-slate-50"
								>
									Login
								</Button>
							</SheetClose>
							<SheetClose asChild>
								<Button
									onClick={() => navigate("/registro")}
									className="h-11 w-full cursor-pointer rounded-full bg-[#1B4FBB] text-[15px] font-semibold text-white hover:bg-[#1745a3]"
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
