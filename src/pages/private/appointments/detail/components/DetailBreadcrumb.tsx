import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type DetailBreadcrumbProps = {
	donorName: string;
	ended: boolean;
};

export function DetailBreadcrumb({ donorName, ended }: DetailBreadcrumbProps) {
	return (
		<nav className="hidden items-center gap-1.5 text-[13px] text-[#9ca3af] lg:flex">
			<Link
				to="/agendamentos"
				className="transition-colors hover:text-[#387ccd]"
			>
				Meus Agendamentos
			</Link>
			{ended && (
				<>
					<ChevronRight className="size-3.5" />
					<Link
						to="/agendamentos"
						className="transition-colors hover:text-[#387ccd]"
					>
						Concluídas
					</Link>
				</>
			)}
			<ChevronRight className="size-3.5" />
			<span className="font-semibold text-[#1f2a37]">{donorName}</span>
		</nav>
	);
}
