import { LoaderCircle, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { AcoesDoSheet } from "@/components/full/AcoesDoSheet";
import { SectionLabel } from "@/components/full/SectionLabel";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { CLASSE_AJUDA, CLASSE_CAMPO, CLASSE_ROTULO } from "@/lib/form-classes";
import { cn } from "@/lib/utils";
import {
	useCreateRoute,
	useDrivers,
	useSpCities,
	useSpDistricts,
} from "../hooks";
import { StopsPicker } from "./StopsPicker";

const LIMITE_NOME = 150;

export function CreateRouteSheet() {
	const [open, setOpen] = useState(false);
	const [tentouCriar, setTentouCriar] = useState(false);

	const [idDriver, setIdDriver] = useState("");
	const [data, setData] = useState("");
	const [hora, setHora] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [city, setCity] = useState("");
	const [neighborhood, setNeighborhood] = useState("");
	const [stops, setStops] = useState<string[]>([]);

	const driversQuery = useDrivers(open);
	const drivers = driversQuery.data ?? [];

	const citiesQuery = useSpCities(open);
	const cities = citiesQuery.data ?? [];
	const cityId = useMemo(
		() => cities.find((item) => item.nome === city)?.id,
		[cities, city],
	);
	const districtsQuery = useSpDistricts(cityId);
	const districts = districtsQuery.data ?? [];

	const createRoute = useCreateRoute();

	const dateSet = data && hora ? `${data}T${hora}` : "";

	const faltando = [
		name.trim().length === 0 && "nome",
		description.trim().length === 0 && "descrição",
		!idDriver && "motorista",
		!data && "data",
		!hora && "horário",
		stops.length === 0 && "ao menos uma parada",
	].filter((item): item is string => Boolean(item));

	const canSubmit = faltando.length === 0;

	function resetForm() {
		setIdDriver("");
		setData("");
		setHora("");
		setName("");
		setDescription("");
		setCity("");
		setNeighborhood("");
		setStops([]);
		setTentouCriar(false);
	}

	function handleOpenChange(next: boolean) {
		setOpen(next);
		if (!next) resetForm();
	}

	function handleSubmit() {
		if (!canSubmit) {
			setTentouCriar(true);
			return;
		}

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
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetTrigger asChild>
				<Button
					variant="primary"
					size="pill"
					type="button"
					className="shrink-0"
				>
					<Plus className="size-4" />
					Criar rota
				</Button>
			</SheetTrigger>

			<SheetContent
				side="bottom"
				className="flex max-h-[92vh] flex-col gap-5 rounded-t-2xl border-none p-5 lg:data-[side=bottom]:inset-x-0 lg:data-[side=bottom]:top-1/2 lg:data-[side=bottom]:bottom-auto lg:data-[side=bottom]:left-1/2 lg:data-[side=bottom]:h-auto lg:data-[side=bottom]:max-h-[min(90vh,52rem)] lg:data-[side=bottom]:w-[720px] lg:data-[side=bottom]:-translate-x-1/2 lg:data-[side=bottom]:-translate-y-1/2 lg:data-[side=bottom]:rounded-card lg:data-[side=bottom]:border lg:data-[side=bottom]:border-line lg:data-[side=bottom]:p-8 lg:data-[side=bottom]:shadow-lift"
			>
				<div className="mx-auto -mt-1 h-1 w-9 shrink-0 rounded-full bg-blue-tint-2 lg:hidden" />

				<SheetHeader className="gap-1 p-0 text-left">
					<SheetTitle className="text-secao font-bold text-ink">
						Criar rota
					</SheetTitle>
					<SheetDescription className="text-apoio text-ink-2">
						O motorista recebe a rota com as paradas na ordem otimizada.
					</SheetDescription>
				</SheetHeader>

				<div className="flex min-h-0 flex-1 flex-col gap-6 area-rolavel">
					<section className="flex flex-col gap-4">
						<SectionLabel>Identificação</SectionLabel>

						<div className="flex flex-col gap-1.5">
							<div className="flex items-center justify-between gap-2">
								<label htmlFor="route-name" className={CLASSE_ROTULO}>
									Nome da rota
								</label>
								<span
									className={cn(
										"text-rotulo tabular-nums",
										name.length > LIMITE_NOME - 20
											? "font-semibold text-orange"
											: "text-ink-3",
									)}
								>
									{name.length}/{LIMITE_NOME}
								</span>
							</div>
							<input
								id="route-name"
								value={name}
								onChange={(event) => setName(event.target.value)}
								maxLength={LIMITE_NOME}
								placeholder="Ex.: Coletas zona sul"
								className={CLASSE_CAMPO}
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label htmlFor="route-description" className={CLASSE_ROTULO}>
								Descrição
							</label>
							<textarea
								id="route-description"
								value={description}
								onChange={(event) => setDescription(event.target.value)}
								rows={3}
								placeholder="Ex.: Coletas da manhã, retornar ao banco de leite até as 12h."
								className={CLASSE_CAMPO}
							/>
							<p className={CLASSE_AJUDA}>
								Aparece para o motorista no detalhe da rota.
							</p>
						</div>
					</section>

					<section className="flex flex-col gap-4">
						<SectionLabel>Motorista e saída</SectionLabel>

						<div className="flex flex-col gap-1.5">
							<label htmlFor="route-driver" className={CLASSE_ROTULO}>
								Motorista
							</label>
							<select
								id="route-driver"
								value={idDriver}
								onChange={(event) => setIdDriver(event.target.value)}
								className={cn(CLASSE_CAMPO, !idDriver && "text-ink-3")}
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

						<div className="grid grid-cols-2 gap-3">
							<div className="flex min-w-0 flex-col gap-1.5">
								<label htmlFor="route-date" className={CLASSE_ROTULO}>
									Data
								</label>
								<input
									id="route-date"
									type="date"
									value={data}
									onChange={(event) => setData(event.target.value)}
									className={CLASSE_CAMPO}
								/>
							</div>

							<div className="flex min-w-0 flex-col gap-1.5">
								<label htmlFor="route-time" className={CLASSE_ROTULO}>
									Horário de saída
								</label>
								<input
									id="route-time"
									type="time"
									value={hora}
									onChange={(event) => setHora(event.target.value)}
									className={CLASSE_CAMPO}
								/>
							</div>
						</div>
					</section>

					<section className="flex flex-col gap-4">
						<SectionLabel>Região</SectionLabel>
						<p className={cn(CLASSE_AJUDA, "-mt-2")}>
							Filtra as paradas disponíveis abaixo. Em branco, mostra todas.
						</p>

						<div className="grid gap-3 sm:grid-cols-2">
							<div className="flex min-w-0 flex-col gap-1.5">
								<label htmlFor="route-city" className={CLASSE_ROTULO}>
									Cidade{" "}
									<span className="font-normal text-ink-3">(opcional)</span>
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
											: "Digite ou escolha (SP)"
									}
									className={CLASSE_CAMPO}
								/>
								<datalist id="route-city-options">
									{cities.map((item) => (
										<option key={item.id} value={item.nome} />
									))}
								</datalist>
							</div>

							<div className="flex min-w-0 flex-col gap-1.5">
								<label htmlFor="route-neighborhood" className={CLASSE_ROTULO}>
									Bairro{" "}
									<span className="font-normal text-ink-3">(opcional)</span>
								</label>
								<input
									id="route-neighborhood"
									list="route-neighborhood-options"
									value={neighborhood}
									onChange={(event) => setNeighborhood(event.target.value)}
									disabled={!cityId}
									placeholder={
										!cityId
											? "Escolha a cidade primeiro"
											: districtsQuery.isLoading
												? "Carregando bairros…"
												: "Digite ou escolha"
									}
									className={CLASSE_CAMPO}
								/>
								<datalist id="route-neighborhood-options">
									{districts.map((item) => (
										<option key={item.id} value={item.nome} />
									))}
								</datalist>
							</div>
						</div>
					</section>

					<StopsPicker
						value={stops}
						onChange={setStops}
						city={city}
						neighborhood={neighborhood}
					/>
				</div>

				{tentouCriar && faltando.length > 0 ? (
					<p className="text-rotulo font-medium text-danger" role="alert">
						Falta preencher: {faltando.join(", ")}.
					</p>
				) : null}

				<AcoesDoSheet>
					<Button
						variant="neutral"
						size="pill"
						type="button"
						onClick={() => handleOpenChange(false)}
						disabled={createRoute.isPending}
					>
						Cancelar
					</Button>
					<Button
						variant="primary"
						size="pill"
						type="button"
						onClick={handleSubmit}
						disabled={createRoute.isPending}
					>
						{createRoute.isPending ? (
							<LoaderCircle className="size-[18px] animate-spin" />
						) : (
							<Plus className="size-[18px]" />
						)}
						{createRoute.isPending ? "Criando…" : "Criar rota"}
					</Button>
				</AcoesDoSheet>
			</SheetContent>
		</Sheet>
	);
}
