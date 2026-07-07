import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
	return (
		<div className="min-h-screen bg-[#f7f7fa] text-slate-900 flex flex-col mx-auto">
			<Header />
			<main className="flex-1 overflow-y-auto p-5">
				<Outlet />
			</main>
		</div>
	);
}
