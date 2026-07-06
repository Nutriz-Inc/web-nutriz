import { CalendarClock, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import type { IDonationPointResponse } from "@/services/types/i-donation";

function formatPhoneNumber(raw: string) {
	const digits = raw.replace(/\D/g, "");

	if (digits.length === 11) {
		return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
	}

	if (digits.length === 10) {
		return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
	}

	return raw;
}

type DonationPointDetailSheetProps = {
	point: IDonationPointResponse | null;
	open: boolean;
	isClosest: boolean;
	onOpenChange: (open: boolean) => void;
};

export function DonationPointDetailSheet({
	point,
	open,
	isClosest,
	onOpenChange,
}: DonationPointDetailSheetProps) {
	const [lastPoint, setLastPoint] = useState(point);

	useEffect(() => {
		if (point) setLastPoint(point);
	}, [point]);

	const displayPoint = point ?? lastPoint;

	if (!displayPoint) return null;

	const donationLabel = displayPoint.has_home ? "Doação - Retirada" : "Retirada";
	const address = displayPoint.address
		? `${displayPoint.address.street}, ${displayPoint.address.number ?? "s/n"} - ${displayPoint.address.neighborhood}, ${displayPoint.address.state}`
		: "Endereço não informado";

	function handleTraceRoute() {
		const { latitude, longitude } = displayPoint?.address ?? {};

		if (latitude == null || longitude == null) return;

		window.open(
			`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
			"_blank",
			"noopener,noreferrer",
		);
	}

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="bottom" className="rounded-t-2xl border-none">
				<div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-[#e0e0e0]" />

				<SheetHeader className="gap-1 px-5 pb-0 pt-2 text-left">
					<div className="flex items-start justify-between gap-2">
						<SheetTitle className="text-[16px] font-bold text-[#1a1a1a]">
							{displayPoint.name}
						</SheetTitle>
						{isClosest && (
							<span className="shrink-0 rounded-full bg-[#edf3ff] px-2.5 py-1 text-[9.5px] font-bold text-[#387ccd]">
								Mais próximo
							</span>
						)}
					</div>
					<SheetDescription className="text-[11px] text-[#888]">
						{displayPoint.description ?? "Ponto de coleta"}
						{displayPoint.distance_from_you != null &&
							` · ${displayPoint.distance_from_you.toFixed(1).replace(".", ",")} km de você`}
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col gap-4 px-5 pb-6 pt-3">
					<span className="flex w-fit items-center gap-1.5 rounded-lg border border-[#c7def5] bg-[#edf3ff] px-3 py-1.5 text-[11px] font-bold uppercase text-[#387ccd]">
						<span className="size-[8px] rounded-sm bg-[#387ccd]" />
						{donationLabel}
					</span>

					<div className="h-px bg-[#e0e0e0]" />

					<div className="flex flex-col gap-4">
						<DetailRow
							icon={<MapPin className="size-[18px] text-[#387ccd]" />}
							label="Endereço"
							value={address}
						/>
						<DetailRow
							icon={<CalendarClock className="size-[18px] text-[#387ccd]" />}
							label="Horário"
							value={displayPoint.opening_hours ?? "Não informado"}
						/>
						<DetailRow
							icon={<Phone className="size-[18px] text-[#387ccd]" />}
							label="Telefone"
							value={
								displayPoint.phone_number
									? formatPhoneNumber(displayPoint.phone_number)
									: "Não informado"
							}
						/>
					</div>

					<div className="h-px bg-[#e0e0e0]" />

					<button
						type="button"
						onClick={handleTraceRoute}
						className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#387ccd] text-[12px] font-bold text-white"
					>
						<Navigation className="size-4" />
						Traçar Rota
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}

function DetailRow({
	icon,
	label,
	value,
}: {
	icon: ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-start gap-3">
			<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#387ccd]/15">
				{icon}
			</div>
			<div className="flex flex-col gap-0.5">
				<span className="text-[12px] text-[#888]">{label}</span>
				<span className="text-[12px] text-[#1a1a1a]">{value}</span>
			</div>
		</div>
	);
}
