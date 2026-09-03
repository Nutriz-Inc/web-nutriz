import {
	CalendarDays,
	CircleAlert,
	Clock,
	MapPin,
	Plus,
	Route as RouteIcon,
	User,
	X,
} from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
import { SectionLabel } from "@/components/full/SectionLabel";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import {
	useCreateRoute,
	useDrivers,
	useSpCities,
	useSpDistricts,
} from "../hooks";
import { StopsPicker } from "./StopsPicker";

const CAMPO =
	"w-full rounded-xl border border-blue-tint bg-surface px-3.5 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-blue-bright disabled:cursor-not-allowed disabled:bg-surface-2 disabled:opacity-70";

const LIMITE_NOME = 150;

// Uma cor por seção, só no selo do título. Serve para o olho achar o bloco de
// relance ao rolar o formulário — o resto da tela segue no azul da marca.
const TOM_DA_SECAO = {
	identificacao: "bg-blue-tint text-blue-deep",
	motorista: "bg-teal-tint text-teal",
	regiao: "bg-purple-tint text-purple",
} as const;

type SecaoProps = {
	titulo: string;
	tom: keyof typeof TOM_DA_SECAO;
	icone: ReactNode;
	children: ReactNode;
};

function Secao({ titulo, tom, icone, children }: SecaoProps) {
	return (
		<section className="flex flex-col gap-3">
			<SectionLabel
				className="gap-2"
				trailing={<span className="h-px flex-1 bg-line" />}
			>
				<span className="flex items-center gap-2">
					<span
						aria-hidden="true"
						className={cn(
							"flex size-6 shrink-0 items-center justify-center rounded-lg",
							TOM_DA_SECAO[tom],
						)}
					>
						{icone}
					</span>
					{titulo}
				</span>
			</SectionLabel>

			{children}
		</section>
	);
}

type CampoProps = {
	id: string;
	rotulo: string;
	icone?: ReactNode;
	opcional?: boolean;
	ajuda?: string;
	contador?: string;
	contadorNoLimite?: boolean;
	children: ReactNode;
};

function Campo({
	id,
	rotulo,
	icone,
	opcional = false,
	ajuda,
	contador,
	contadorNoLimite = false,
	children,
}: CampoProps) {
	return (
		<div className="flex min-w-0 flex-col gap-1.5">
			<div className="flex items-center justify-between gap-2">
				<label
					htmlFor={id}
					className="flex items-center gap-1.5 text-[13px] font-semibold text-ink"
				>
					{icone}
					{rotulo}
					{opcional && (
						<span className="font-normal text-ink-2">(opcional)</span>
					)}
				</label>

				{contador && (
					<span
						className={cn(
							"text-[11px] tabular-nums transition-colors",
							contadorNoLimite ? "font-semibold text-warning" : "text-ink-2",
						)}
					>
						{contador}
					</span>
				)}
			</div>

			{children}

			{ajuda && (
				<p className="text-[12px] leading-relaxed text-ink-2">{ajuda}</p>
			)}
		</div>
	);
}

export function CreateRouteDialog() {
	const [open, setOpen] = useState(false);

	const [idDriver, setIdDriver] = useState("");
	// Data e hora ficam separadas na tela; o backend segue recebendo um instante
	// só, montado no envio.
	const [data, setData] = useState("");
	const [hora, setHora] = useState("");
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

	const dateSet = data && hora ? `${data}T${hora}` : "";

	// Mesma exigencia de antes: o `datetime-local` so entregava valor com data e
	// hora preenchidas, entao separar os campos nao afrouxou nem apertou a regra.
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
					className="flex h-[43px] shrink-0 items-center justify-center gap-2 rounded-full bg-blue-deep-fill px-5 text-[14px] font-semibold text-white transition-transform hover:bg-blue-fill active:scale-[0.98]"
				>
					<Plus className="size-4" />
					Criar rota
				</button>
			</AlertDialogTrigger>

			<AlertDialogContent className="flex max-h-[88vh] w-[calc(100%-1.5rem)] max-w-3xl flex-col overflow-hidden p-0">
				<button
					type="button"
					aria-label="Fechar"
					onClick={() => handleOpenChange(false)}
					disabled={createRoute.isPending}
					className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full text-ink-2 outline-none transition-colors hover:bg-surface-3 hover:text-ink focus-visible:ring-4 focus-visible:ring-blue-bright/50 disabled:opacity-40"
				>
					<X className="size-4" />
				</button>

				<AlertDialogHeader className="items-start border-b border-line px-6 pb-5 pt-6 text-left sm:px-8">
					<div className="flex items-center gap-3">
						<span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-tint">
							<RouteIcon className="size-5 text-blue-deep" />
						</span>

						<div className="flex flex-col gap-0.5">
							<AlertDialogTitle className="font-display text-[20px] font-extrabold text-blue-deep">
								Criar rota
							</AlertDialogTitle>
							<AlertDialogDescription className="text-[13px] text-ink-2">
								O motorista recebe a rota com as paradas na ordem otimizada.
							</AlertDialogDescription>
						</div>
					</div>
				</AlertDialogHeader>

				<div className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto px-6 py-6 text-left sm:px-8">
					<Secao
						titulo="Identificação"
						tom="identificacao"
						icone={<RouteIcon className="size-3.5" />}
					>
						<Campo
							id="route-name"
							rotulo="Nome da rota"
							contador={`${name.length}/${LIMITE_NOME}`}
							contadorNoLimite={name.length > LIMITE_NOME - 20}
						>
							<input
								id="route-name"
								value={name}
								onChange={(event) => setName(event.target.value)}
								maxLength={LIMITE_NOME}
								placeholder="Ex.: Coletas zona sul"
								className={CAMPO}
							/>
						</Campo>

						<Campo
							id="route-description"
							rotulo="Descrição"
							ajuda="Aparece para o motorista no detalhe da rota."
						>
							<textarea
								id="route-description"
								value={description}
								onChange={(event) => setDescription(event.target.value)}
								rows={3}
								placeholder="Ex.: Coletas da manhã, retornar ao banco de leite até as 12h."
								className={cn(CAMPO, "resize-y")}
							/>
						</Campo>
					</Secao>

					<Secao
						titulo="Motorista e data"
						tom="motorista"
						icone={<User className="size-3.5" />}
					>
						<Campo
							id="route-driver"
							rotulo="Motorista"
							icone={<User className="size-4 text-ink-2" />}
						>
							<select
								id="route-driver"
								value={idDriver}
								onChange={(event) => setIdDriver(event.target.value)}
								className={cn(CAMPO, !idDriver && "text-ink-3")}
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
						</Campo>

						<div className="grid gap-3 sm:grid-cols-2">
							<Campo
								id="route-date"
								rotulo="Data"
								icone={<CalendarDays className="size-4 text-ink-2" />}
							>
								<input
									id="route-date"
									type="date"
									value={data}
									onChange={(event) => setData(event.target.value)}
									className={CAMPO}
								/>
							</Campo>

							<Campo
								id="route-time"
								rotulo="Horário de saída"
								icone={<Clock className="size-4 text-ink-2" />}
							>
								<input
									id="route-time"
									type="time"
									value={hora}
									onChange={(event) => setHora(event.target.value)}
									className={CAMPO}
								/>
							</Campo>
						</div>
					</Secao>

					<Secao
						titulo="Região"
						tom="regiao"
						icone={<MapPin className="size-3.5" />}
					>
						<p className="text-[12px] leading-relaxed text-ink-2">
							Serve para filtrar as paradas disponíveis abaixo. Deixe em branco
							para ver todas.
						</p>

						<div className="grid gap-3 sm:grid-cols-2">
							<Campo
								id="route-city"
								rotulo="Cidade"
								opcional
								icone={<MapPin className="size-4 text-ink-2" />}
							>
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
									className={CAMPO}
								/>
								<datalist id="route-city-options">
									{cities.map((item) => (
										<option key={item.id} value={item.nome} />
									))}
								</datalist>
							</Campo>

							<Campo id="route-neighborhood" rotulo="Bairro" opcional>
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
									className={CAMPO}
								/>
								<datalist id="route-neighborhood-options">
									{districts.map((item) => (
										<option key={item.id} value={item.nome} />
									))}
								</datalist>
							</Campo>
						</div>
					</Secao>

					<StopsPicker
						value={stops}
						onChange={setStops}
						city={city}
						neighborhood={neighborhood}
					/>
				</div>

				<div className="flex flex-col gap-2.5 border-t border-line px-6 py-5 sm:flex-row-reverse sm:items-center sm:px-8">
					<button
						type="button"
						onClick={handleSubmit}
						disabled={!canSubmit || createRoute.isPending}
						className="flex h-12 w-full items-center justify-center rounded-2xl bg-blue-deep-fill text-[15px] font-bold text-white outline-none transition-[transform,background-color] hover:bg-blue-fill focus-visible:ring-4 focus-visible:ring-blue-bright/50 active:scale-[0.99] disabled:opacity-60 sm:w-auto sm:px-8"
					>
						{createRoute.isPending ? "Criando…" : "Criar rota"}
					</button>

					<AlertDialogCancel
						disabled={createRoute.isPending}
						className="sm:w-auto sm:px-6"
					>
						Cancelar
					</AlertDialogCancel>

					{faltando.length > 0 && (
						<p className="flex items-start gap-2 rounded-xl bg-warning-tint px-3 py-2 text-[12px] leading-relaxed text-warning sm:mr-auto sm:max-w-[46ch]">
							<CircleAlert className="mt-px size-4 shrink-0" />
							<span>
								Falta preencher:{" "}
								<span className="font-semibold">{faltando.join(", ")}</span>.
							</span>
						</p>
					)}
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
