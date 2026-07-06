import { CalendarClock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import type { IDonationPointResponse } from "@/services/types/i-donation";
import { formatCep, formatPhoneNumber } from "@/utils/formatter";
import { DetailRow } from "./DetailRow";
import { CollectionType } from "./CollectionType";

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

	if (point && point !== lastPoint) {
		setLastPoint(point);
	}

	const displayPoint = point ?? lastPoint;

	if (!displayPoint) return null;

	const address = displayPoint.address
		? `${displayPoint.address.street}, ${displayPoint.address.number ?? "s/n"} ${displayPoint.address.complement ? `, ${displayPoint.address.complement}` : ""} - ${displayPoint.address.neighborhood}, ${displayPoint.address.state} ${formatCep(displayPoint.address.zipcode)}`
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

				<SheetHeader className="gap-1 pb-0 pl-5 pr-12 pt-2 text-left">
					<div className="flex min-w-0 items-start justify-between gap-2">
						<SheetTitle className="min-w-0 flex-1 break-words text-[16px] font-bold text-[#1a1a1a]">
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
					<CollectionType hasHome={displayPoint.has_home} variant="detail" />

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
						<DetailRow
							icon={<Mail className="size-[18px] text-[#387ccd]" />}
							label="Email"
							value={displayPoint.email || "Não informado"}
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
