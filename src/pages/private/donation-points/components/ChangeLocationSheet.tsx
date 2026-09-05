import { LoaderCircle, LocateFixed, Search } from "lucide-react";
import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { formatZipCode } from "@/utils/formatter";
import { type GeoCoordinates, geocodeZipCode } from "@/utils/geocode";

type Coordinates = GeoCoordinates;

type ChangeLocationSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onApplyZipCode: (zipCode: string, coordinates: Coordinates | null) => void;
	onApplyCurrentLocation: (coordinates: Coordinates) => void;
};

export function ChangeLocationSheet({
	open,
	onOpenChange,
	onApplyZipCode,
	onApplyCurrentLocation,
}: ChangeLocationSheetProps) {
	const [zipCode, setZipCode] = useState("");
	const [isLocating, setIsLocating] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [locationError, setLocationError] = useState("");

	const zipCodeDigits = zipCode.replace(/\D/g, "");

	function reset() {
		setZipCode("");
		setIsLocating(false);
		setIsSearching(false);
		setLocationError("");
	}

	async function handleSearch() {
		if (zipCodeDigits.length !== 8 || isSearching) return;

		setIsSearching(true);

		const coordinates = await geocodeZipCode(zipCodeDigits);

		setIsSearching(false);
		onApplyZipCode(zipCodeDigits, coordinates);
		reset();
	}

	function handleUseCurrentLocation() {
		if (!navigator.geolocation) {
			setLocationError("Seu navegador não suporta geolocalização.");
			return;
		}

		setIsLocating(true);
		setLocationError("");

		navigator.geolocation.getCurrentPosition(
			(position) => {
				onApplyCurrentLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
				reset();
			},
			(error) => {
				setIsLocating(false);
				setLocationError(
					error.code === error.PERMISSION_DENIED
						? "Permissão de localização negada. Ative o acesso à localização nas configurações do navegador."
						: "Não foi possível obter sua localização. Tente novamente.",
				);
			},
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
		);
	}

	return (
		<Sheet
			open={open}
			onOpenChange={(next) => {
				if (!next) reset();
				onOpenChange(next);
			}}
		>
			<SheetContent
				side="bottom"
				className="rounded-t-2xl border-none p-2 lg:data-[side=bottom]:inset-x-auto lg:data-[side=bottom]:top-1/2 lg:data-[side=bottom]:bottom-auto lg:data-[side=bottom]:left-1/2 lg:data-[side=bottom]:w-[440px] lg:data-[side=bottom]:-translate-x-1/2 lg:data-[side=bottom]:-translate-y-1/2 lg:data-[side=bottom]:rounded-card lg:data-[side=bottom]:border lg:data-[side=bottom]:border-line lg:data-[side=bottom]:shadow-lift"
			>
				<div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-blue-tint-2 lg:hidden" />

				<SheetHeader className="gap-1 px-5 pb-0 pt-3 text-left">
					<SheetTitle className="text-[14px] font-bold text-ink">
						Trocar endereço de busca
					</SheetTitle>
					<SheetDescription className="text-[11px] text-ink-3">
						Digite o CEP
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col gap-4 px-5 pb-6 pt-4">
					<div className="relative">
						<Search className="pointer-events-none absolute left-4 top-1/2 size-[13px] -translate-y-1/2 text-ink-3" />
						<input
							inputMode="numeric"
							value={formatZipCode(zipCode)}
							onChange={(e) => setZipCode(formatZipCode(e.target.value))}
							onKeyDown={(e) => {
								if (e.key === "Enter") handleSearch();
							}}
							placeholder="00000-000"
							aria-label="CEP para buscar pontos de coleta"
							className="h-11 w-full rounded-xl border border-line bg-surface-2 pl-10 pr-4 text-[13px] text-ink outline-none placeholder:text-ink-3/65"
						/>
					</div>

					<div className="flex items-center gap-3">
						<div className="h-px flex-1 bg-blue-tint-2" />
						<span className="text-[11px] text-ink-3">ou</span>
						<div className="h-px flex-1 bg-blue-tint-2" />
					</div>

					<button
						type="button"
						onClick={handleUseCurrentLocation}
						disabled={isLocating}
						className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 p-3 text-left disabled:opacity-60"
					>
						{isLocating ? (
							<LoaderCircle className="size-[19px] shrink-0 animate-spin text-blue-deep" />
						) : (
							<LocateFixed className="size-[19px] shrink-0 text-blue-deep" />
						)}
						<div className="flex flex-col">
							<span className="text-[12px] font-bold text-ink">
								{isLocating
									? "Obtendo localização..."
									: "Usar minha localização atual"}
							</span>
							<span className="text-[10px] text-ink-3">
								Ativa o GPS do dispositivo
							</span>
						</div>
					</button>

					{locationError && (
						<p className="text-[11px] text-danger">{locationError}</p>
					)}

					<button
						type="button"
						onClick={handleSearch}
						disabled={zipCodeDigits.length !== 8 || isSearching}
						className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-bright-fill text-[12px] font-bold text-white transition-opacity disabled:opacity-60"
					>
						{isSearching && <LoaderCircle className="size-4 animate-spin" />}
						{isSearching ? "Buscando..." : "Buscar"}
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
