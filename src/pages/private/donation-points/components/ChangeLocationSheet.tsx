import { LocateFixed, Search } from "lucide-react";
import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

type Coordinates = {
	latitude: number;
	longitude: number;
};

function formatZipCode(raw: string) {
	const digits = raw.replace(/\D/g, "").slice(0, 8);

	if (digits.length <= 5) return digits;

	return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

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

	const zipCodeDigits = zipCode.replace(/\D/g, "");

	function reset() {
		setZipCode("");
	}

	function handleSearch() {
		if (zipCodeDigits.length !== 8) return;

		onApplyZipCode(zipCodeDigits);
		reset();
	}

	function handleUseCurrentLocation() {
		navigator.geolocation?.getCurrentPosition((position) => {
			onApplyCurrentLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
			reset();
		});
	}

	return (
		<Sheet
			open={open}
			onOpenChange={(next) => {
				if (!next) reset();
				onOpenChange(next);
			}}
		>
			<SheetContent side="bottom" className="rounded-t-2xl border-none">
				<div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-[#e0e0e0]" />

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
						className="flex items-center gap-3 rounded-xl border border-[#e0e0e0] bg-[#f7f7f7] p-3 text-left"
					>
						<LocateFixed className="size-[19px] shrink-0 text-[#00458b]" />
						<div className="flex flex-col">
							<span className="text-[12px] font-bold text-[#1a1a1a]">
								Usar minha localização atual
							</span>
							<span className="text-[10px] text-[#888]">
								Ativa o GPS do dispositivo
							</span>
						</div>
					</button>

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
