import { LocateFixed, LoaderCircle, Search } from "lucide-react";
import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { formatZipCode } from "@/utils/formatter";

type Coordinates = {
	latitude: number;
	longitude: number;
};

type ChangeLocationSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onApplyZipCode: (zipCode: string) => void;
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
	const [locationError, setLocationError] = useState("");

	const zipCodeDigits = zipCode.replace(/\D/g, "");

	function reset() {
		setZipCode("");
		setIsLocating(false);
		setLocationError("");
	}

	function handleSearch() {
		if (zipCodeDigits.length !== 8) return;

		onApplyZipCode(zipCodeDigits);
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
				className="rounded-t-2xl border-none lg:data-[side=bottom]:inset-x-auto lg:data-[side=bottom]:left-auto lg:data-[side=bottom]:right-8 lg:data-[side=bottom]:bottom-8 lg:data-[side=bottom]:w-[420px] lg:data-[side=bottom]:rounded-2xl lg:data-[side=bottom]:border lg:data-[side=bottom]:border-[#e0e0e0] lg:data-[side=bottom]:shadow-2xl p-2"
			>
				<div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-[#e0e0e0] lg:hidden" />

				<SheetHeader className="gap-1 px-5 pb-0 pt-3 text-left">
					<SheetTitle className="text-[14px] font-bold text-[#1a1a1a]">
						Trocar endereço de busca
					</SheetTitle>
					<SheetDescription className="text-[11px] text-[#888]">
						Digite o CEP
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col gap-4 px-5 pb-6 pt-4">
					<div className="relative">
						<Search className="pointer-events-none absolute left-4 top-1/2 size-[13px] -translate-y-1/2 text-[#888]" />
						<input
							inputMode="numeric"
							value={formatZipCode(zipCode)}
							onChange={(e) => setZipCode(formatZipCode(e.target.value))}
							onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							placeholder="00000-000"
							className="h-11 w-full rounded-xl border border-[#e0e0e0] bg-[#f7f7f7] pl-10 pr-4 text-[13px] text-[#1a1a1a] outline-none placeholder:text-[#888]/65"
						/>
					</div>

					<div className="flex items-center gap-3">
						<div className="h-px flex-1 bg-[#e0e0e0]" />
						<span className="text-[11px] text-[#888]">ou</span>
						<div className="h-px flex-1 bg-[#e0e0e0]" />
					</div>

					<button
						type="button"
						onClick={handleUseCurrentLocation}
						disabled={isLocating}
						className="flex items-center gap-3 rounded-xl border border-[#e0e0e0] bg-[#f7f7f7] p-3 text-left disabled:opacity-60"
					>
						{isLocating ? (
							<LoaderCircle className="size-[19px] shrink-0 animate-spin text-[#00458b]" />
						) : (
							<LocateFixed className="size-[19px] shrink-0 text-[#00458b]" />
						)}
						<div className="flex flex-col">
							<span className="text-[12px] font-bold text-[#1a1a1a]">
								{isLocating
									? "Obtendo localização..."
									: "Usar minha localização atual"}
							</span>
							<span className="text-[10px] text-[#888]">
								Ativa o GPS do dispositivo
							</span>
						</div>
					</button>

					{locationError && (
						<p className="text-[11px] text-red-500">{locationError}</p>
					)}

					<button
						type="button"
						onClick={handleSearch}
						disabled={zipCodeDigits.length !== 8}
						className="flex h-11 w-full items-center justify-center rounded-xl bg-[#387ccd] text-[12px] font-bold text-white transition-opacity disabled:opacity-60"
					>
						Buscar
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
