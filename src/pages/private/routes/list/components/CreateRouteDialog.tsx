import { Plus, Route as RouteIcon } from "lucide-react";
import { useMemo, useState } from "react";
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
import {
	useCreateRoute,
	useDrivers,
	useSpCities,
	useSpDistricts,
} from "../hooks";
import { StopsPicker } from "./StopsPicker";

const FIELD_CLASS =
	"rounded-card-sm border border-line bg-surface px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-3 disabled:opacity-60";
const LABEL_CLASS = "text-[12px] font-semibold text-ink-2";

export function CreateRouteDialog() {
	const [open, setOpen] = useState(false);

	const [idDriver, setIdDriver] = useState("");
	const [dateSet, setDateSet] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [city, setCity] = useState("");
	const [neighborhood, setNeighborhood] = useState("");
	const [stops, setStops] = useState<string[]>([]);

	const driversQuery = useDrivers();
	const drivers = driversQuery.data ?? [];

	const citiesQuery = useSpCities();
	const cities = citiesQuery.data ?? [];
	const cityId = useMemo(
		() => cities.find((item) => item.nome === city)?.id,
		[cities, city],
	);
	const districtsQuery = useSpDistricts(cityId);
	const districts = districtsQuery.data ?? [];

	const createRoute = useCreateRoute();

	const canSubmit =
		Boolean(idDriver) &&
		Boolean(dateSet) &&
		name.trim().length > 0 &&
		description.trim().length > 0 &&
		stops.length > 0;

	function resetForm() {
		setIdDriver("");
		setDateSet("");
		setName("");
		setDescription("");
		setCity("");
		setNeighborhood("");
		setStops([]);
	}

	function handleOpenChange(next: boolean) {
		setOpen(next);
		if (!next) resetForm();
	}

	function handleSubmit() {
		if (!canSubmit) return;

		createRoute.mutate(
			{
				id_driver: idDriver,
				date_set: new Date(dateSet).toISOString(),
				name: name.trim(),
				description: description.trim(),
				stops,
				city: city || undefined,
				neighborhood: neighborhood || undefined,
			},
			{
				onSuccess: () => handleOpenChange(false),
			},
		);
	}

	return (
		<AlertDialog open={open} onOpenChange={handleOpenChange}>
			<AlertDialogTrigger asChild>
				<button
					type="button"
					className="flex h-[43px] shrink-0 items-center justify-center gap-2 rounded-full bg-blue-deep-fill hover:bg-blue-fill px-5 text-[14px] font-semibold text-white transition-transform active:scale-[0.98]"
				>
					<Plus className="size-4" />
					Criar rota
				</button>
			</AlertDialogTrigger>

			<AlertDialogContent className="flex max-h-[85vh] max-w-2xl flex-col overflow-y-auto">
				<AlertDialogHeader>
					<div className="flex size-12 items-center justify-center rounded-full bg-blue-tint">
						<RouteIcon className="size-5 text-blue-deep" />
					</div>
					<AlertDialogTitle>Criar rota</AlertDialogTitle>
					<AlertDialogDescription>
						Defina o motorista, a data programada e as paradas da rota.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="mt-4 flex flex-col gap-4 text-left">
					<div className="flex flex-col gap-1.5">
						<label htmlFor="route-driver" className={LABEL_CLASS}>
							Motorista
						</label>
						<select
							id="route-driver"
							value={idDriver}
							onChange={(event) => setIdDriver(event.target.value)}
							className={FIELD_CLASS}
						>
							<option value="">
								{driversQuery.isLoading
									? "Carregando motoristas…"
									: "Selecione um motorista"}
							</option>
							{drivers.map((driver) => (
								<option key={driver.id_user} value={driver.id_user}>
									{driver.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col gap-1.5">
						<label htmlFor="route-date" className={LABEL_CLASS}>
							Data programada
						</label>
						<input
							id="route-date"
							type="datetime-local"
							value={dateSet}
							onChange={(event) => setDateSet(event.target.value)}
							className={FIELD_CLASS}
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label htmlFor="route-name" className={LABEL_CLASS}>
							Nome da rota
						</label>
						<input
							id="route-name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							maxLength={150}
							placeholder="Ex: Coletas zona sul"
							className={FIELD_CLASS}
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label htmlFor="route-description" className={LABEL_CLASS}>
							Descrição
						</label>
						<textarea
							id="route-description"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
							rows={2}
							placeholder="Detalhes da rota"
							className={FIELD_CLASS}
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label htmlFor="route-city" className={LABEL_CLASS}>
							Cidade <span className="font-normal text-ink-3">(opcional)</span>
						</label>
						<input
							id="route-city"
							list="route-city-options"
							value={city}
							onChange={(event) => {
								setCity(event.target.value);
								setNeighborhood("");
							}}
							placeholder={
								citiesQuery.isLoading
									? "Carregando cidades…"
									: "Selecione a cidade (SP)"
							}
							className={FIELD_CLASS}
						/>
						<datalist id="route-city-options">
							{cities.map((item) => (
								<option key={item.id} value={item.nome} />
							))}
						</datalist>
					</div>

					<div className="flex flex-col gap-1.5">
						<label htmlFor="route-neighborhood" className={LABEL_CLASS}>
							Bairro <span className="font-normal text-ink-3">(opcional)</span>
						</label>
						<input
							id="route-neighborhood"
							list="route-neighborhood-options"
							value={neighborhood}
							onChange={(event) => setNeighborhood(event.target.value)}
							disabled={!cityId}
							placeholder={
								!cityId
									? "Escolha uma cidade primeiro"
									: districtsQuery.isLoading
										? "Carregando bairros…"
										: "Selecione o bairro"
							}
							className={FIELD_CLASS}
						/>
						<datalist id="route-neighborhood-options">
							{districts.map((item) => (
								<option key={item.id} value={item.nome} />
							))}
						</datalist>
					</div>

					<StopsPicker
						value={stops}
						onChange={setStops}
						city={city}
						neighborhood={neighborhood}
					/>
				</div>

				<AlertDialogFooter>
					<button
						type="button"
						onClick={handleSubmit}
						disabled={!canSubmit || createRoute.isPending}
						className="h-12 w-full rounded-2xl bg-blue-deep-fill text-[14px] font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
					>
						{createRoute.isPending ? "Criando…" : "Criar rota"}
					</button>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
