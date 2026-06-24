

import { Bell, Search, Settings, User } from "lucide-react";

export function Header() {
	return (
		<header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
			<div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<div className="rounded-3xl bg-[#EFF5FF] px-4 py-3 text-sm font-semibold text-[#0B57B8] shadow-sm">
						Dashboard Nutriz
					</div>
					<div className="hidden rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm sm:flex sm:items-center gap-2">
						<Search className="h-4 w-4" />
						<input
							type="search"
							placeholder="Buscar"
							className="w-40 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
						/>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<button
						type="button"
						className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
					>
						<Bell className="h-5 w-5" />
					</button>
					<button
						type="button"
						className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
					>
						<Settings className="h-5 w-5" />
					</button>
					<div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm">
						<div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-200 text-slate-700">
							<User className="h-5 w-5" />
						</div>
						<div>
							<p className="text-xs text-slate-500">Bem-vinda</p>
							<p className="font-semibold text-slate-950">Maria</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
