import { Activity, BookOpen, ChartBar, Home, Settings, HeartPulse } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
	{
		label: "Visão geral",
		icon: Home,
		to: "/home",
	},
	{
		label: "Meu plano",
		icon: Activity,
	},
	{
		label: "Refeições",
		icon: BookOpen,
	},
	{
		label: "Acompanhamento",
		icon: ChartBar,
	},
	{
		label: "Favoritos",
		icon: HeartPulse,
	},
];

export function Sidebar() {
	return (
		<aside className="hidden w-[300px] shrink-0 border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col">
			<div className="mb-10 flex items-center gap-3">
				<div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EDF4FF] text-[#0B57B8] shadow-sm">
					<Home className="h-6 w-6" />
				</div>
				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-slate-500">Nutriz</p>
					<h2 className="text-xl font-semibold text-slate-950">Painel</h2>
				</div>
			</div>

			<nav className="space-y-2">
				{navItems.map((item) => {
					const Icon = item.icon;
					return item.to ? (
						<NavLink
							key={item.label}
							to={item.to}
							className={({ isActive }) =>
								cn(
									"flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition",
									isActive
										? "bg-slate-950 text-white"
										: "text-slate-700 hover:bg-slate-50"
								)
							}
						>
							<span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
								<Icon className="h-5 w-5" />
							</span>
							{item.label}
						</NavLink>
					) : (
						<button
							key={item.label}
							type="button"
							className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
						>
							<span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
								<Icon className="h-5 w-5" />
							</span>
							{item.label}
						</button>
					);
				})}
			</nav>

			<div className="mt-auto rounded-[2rem] bg-slate-50 p-5 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200">
				<p className="text-xs uppercase tracking-[0.26em] text-slate-500">Seu plano</p>
				<p className="mt-3 font-semibold text-slate-950">Plano Nutriz Premium</p>
				<p className="mt-2 text-sm leading-6 text-slate-600">
					Acompanhe refeições e metas de nutrição em um só lugar.
				</p>
			</div>
		</aside>
	);
}
