import { Link, useLocation } from "react-router-dom";
import { useRemovedByUser } from "../hooks";

type RemovedByFieldProps = {
	idUser: string;
};

export function RemovedByField({ idUser }: RemovedByFieldProps) {
	const location = useLocation();
	const removedByQuery = useRemovedByUser(idUser);

	return (
		<div className="flex flex-col gap-1">
			<p className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">
				Removido por
			</p>
			<Link
				to={`/usuarios/${idUser}`}
				state={{ backTo: location.pathname }}
				className="w-fit text-[14px] font-medium text-blue-deep underline underline-offset-2 transition-colors hover:text-blue-bright"
			>
				{removedByQuery.data?.name ?? idUser}
			</Link>
		</div>
	);
}
