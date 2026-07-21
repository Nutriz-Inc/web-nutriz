import { Heart, Search } from "lucide-react";
import { getInitials } from "@/components/layout/utils";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useScrollToSection } from "../hooks/use-scroll-to-section";

const TABS = [
	{ id: "artigos", label: "Todos os artigos" },
	{ id: "videos", label: "Vídeos" },
	{ id: "duvidas-frequentes", label: "Dúvidas frequentes" },
];

type ContentHubHeaderProps = {
	search: string;
	onSearchChange: (value: string) => void;
	activeTab: string;
	onTabChange: (tabId: string) => void;
};

export function ContentHubHeader({
	search,
	onSearchChange,
	activeTab,
	onTabChange,
}: ContentHubHeaderProps) {
	const { auth } = useAuth();
	const scrollToSection = useScrollToSection();

	function handleTabClick(tabId: string) {
		onTabChange(tabId);
		scrollToSection(tabId);
	}

	return (
		<header className="flex h-auto flex-col gap-3 bg-[#0d3b6e] px-5 py-3 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0 lg:px-8">
			<div className="flex items-center justify-between gap-4 sm:justify-start">
				<div className="flex items-center gap-2 text-white">
					<Heart className="size-4 fill-white" aria-hidden />
					<span className="text-[14px] font-bold whitespace-nowrap">
						Central de conteúdos
					</span>
				</div>

				<span
					aria-hidden
					className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-[12px] font-bold text-white sm:hidden"
				>
					{getInitials(auth?.name)}
				</span>
			</div>

			<nav
				aria-label="Seções da central de conteúdos"
				className="scrollbar-none flex items-center gap-1 overflow-x-auto"
			>
				{TABS.map((tab) => (
					<button
						key={tab.id}
						type="button"
						onClick={() => handleTabClick(tab.id)}
						aria-current={activeTab === tab.id ? "true" : undefined}
						className={cn(
							"min-h-11 shrink-0 whitespace-nowrap rounded-lg px-3 text-[13.5px] font-medium text-white/70 transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
							activeTab === tab.id && "bg-white/12 font-semibold text-white",
						)}
					>
						{tab.label}
					</button>
				))}
			</nav>

			<div className="flex items-center gap-3 sm:ml-auto">
				<div className="relative w-full sm:w-[220px]">
					<Search
						className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
						aria-hidden
					/>
					<input
						value={search}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder="Buscar conteúdos..."
						aria-label="Buscar conteúdos"
						className="h-9 w-full rounded-full bg-white/12 pl-9 pr-4 text-[13px] text-white outline-none placeholder:text-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					/>
				</div>

				<span
					aria-hidden
					className="hidden size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-[12px] font-bold text-white sm:flex"
				>
					{getInitials(auth?.name)}
				</span>
			</div>
		</header>
	);
}
