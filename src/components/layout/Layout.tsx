import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function Layout() {
	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			<div className="flex min-h-screen">
				<Sidebar />

				<div className="flex min-h-screen flex-1 flex-col">
					<Header />
					<main className="flex-1 overflow-y-auto p-6 sm:p-8">
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
}
