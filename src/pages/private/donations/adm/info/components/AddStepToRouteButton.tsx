import { Route as RouteIcon } from "lucide-react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDateBR } from "@/utils/formatter";
import {
	useAddStepToRoute,
	usePendingRoutes,
	useStepsAvailableForRoute,
} from "../hooks";

type Props = {
	idDonation: string;
	idDonationStep: string;
};

export function AddStepToRouteButton({ idDonation, idDonationStep }: Props) {
	const [open, setOpen] = useState(false);
	const [idRoute, setIdRoute] = useState("");

	const availableQuery = useStepsAvailableForRoute(idDonation);
	const isAvailableForRoute = Boolean(
		availableQuery.data?.data.some(
			(step) => step.id_donation_step === idDonationStep,
		),
	);

	const routesQuery = usePendingRoutes();
	const routes = routesQuery.data?.data ?? [];

	const addMutation = useAddStepToRoute();

	function handleOpenChange(next: boolean) {
		setOpen(next);
		if (!next) setIdRoute("");
	}

	function handleConfirm() {
		if (!idRoute) return;

		addMutation.mutate(
			{ id_route: idRoute, id_donation_step: idDonationStep },
			{ onSuccess: () => handleOpenChange(false) },
		);
	}

	if (!isAvailableForRoute) return null;

	return (
		<AlertDialog open={open} onOpenChange={handleOpenChange}>
			<AlertDialogTrigger asChild>
				<button
					type="button"
					className="flex items-center gap-1.5 self-start rounded-lg border border-dashed border-blue-bright px-3 py-1.5 text-[12px] font-semibold text-blue-deep transition-colors hover:bg-blue-tint"
				>
					<RouteIcon className="size-3.5" />
					Adicionar a uma rota
				</button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex size-12 items-center justify-center rounded-full bg-blue-tint">
						<RouteIcon className="size-5 text-blue-deep" />
					</div>
					<AlertDialogTitle>Adicionar etapa a uma rota</AlertDialogTitle>
					<AlertDialogDescription>
						Selecione uma rota pendente. A etapa entra como uma nova parada.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="mt-4 flex flex-col gap-1.5 text-left">
					<label
						htmlFor="add-step-route"
						className="text-[12px] font-semibold text-ink-2"
					>
						Rota pendente
					</label>
					<select
						id="add-step-route"
						value={idRoute}
						onChange={(event) => setIdRoute(event.target.value)}
						className="rounded-card-sm border border-line bg-surface px-3 py-2 text-[13px] text-ink outline-none"
					>
						<option value="">
							{routesQuery.isLoading
								? "Carregando rotas…"
								: "Selecione uma rota"}
						</option>
						{routes.map((route) => (
							<option key={route.id_route} value={route.id_route}>
								{route.name} · {formatDateBR(route.date_set)}
								{route.driver_name ? ` · ${route.driver_name}` : ""}
							</option>
						))}
					</select>
					{!routesQuery.isLoading && routes.length === 0 && (
						<p className="text-[12px] text-ink-3">
							Nenhuma rota pendente disponível.
						</p>
					)}
				</div>

				<AlertDialogFooter>
					<button
						type="button"
						onClick={handleConfirm}
						disabled={!idRoute || addMutation.isPending}
						className="h-12 w-full rounded-2xl bg-blue-deep-fill text-[14px] font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
					>
						{addMutation.isPending ? "Adicionando…" : "Adicionar à rota"}
					</button>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
