import { CalendarClock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import { DetailRow } from "@/components/full/DetailRow";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import type { IDonationPointResponse } from "@/services/types/i-donation";
import { formatCep, formatPhoneNumber } from "@/utils/formatter";
import { CollectionType } from "./CollectionType";
import type { Coordinates } from "./FitMapView";

type DonationPointDetailSheetProps = {
	point: IDonationPointResponse | null;
	open: boolean;
	isClosest: boolean;
	onOpenChange: (open: boolean) => void;
	origin?: Coordinates | null;
};

export function DonationPointDetailSheet({
	point,
	open,
	isClosest,
	onOpenChange,
	origin,
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

		const parametros = new URLSearchParams({
			api: "1",
			destination: `${latitude},${longitude}`,
		});

		if (origin) {
			parametros.set("origin", `${origin.latitude},${origin.longitude}`);
		}

		window.open(
			`https://www.google.com/maps/dir/?${parametros.toString()}`,
			"_blank",
			"noopener,noreferrer",
		);
	}

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="bottom"
				className="rounded-t-2xl border-none lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:data-[side=bottom]:inset-x-auto lg:data-[side=bottom]:left-auto lg:data-[side=bottom]:right-8 lg:data-[side=bottom]:bottom-8 lg:data-[side=bottom]:w-[420px] lg:data-[side=bottom]:rounded-2xl lg:data-[side=bottom]:border lg:data-[side=bottom]:border-line lg:data-[side=bottom]:shadow-lift p-2"
			>
				<div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-blue-tint-2 lg:hidden" />

				<SheetHeader className="gap-1 pb-0 pl-5 pr-12 pt-2 text-left">
					<div className="flex min-w-0 items-start justify-between gap-2">
						<SheetTitle className="min-w-0 flex-1 break-words text-[16px] font-bold text-ink">
							{displayPoint.name}
						</SheetTitle>
						{isClosest && (
							<span className="shrink-0 rounded-full bg-canvas px-2.5 py-1 text-[10px] font-bold text-blue-bright">
								Mais próximo
							</span>
						)}
					</div>
					<SheetDescription className="text-[11px] text-ink-3">
						{displayPoint.description ?? "Ponto de coleta"}
						{displayPoint.distance_from_you != null &&
							` · ${displayPoint.distance_from_you.toFixed(1).replace(".", ",")} km de você`}
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col gap-4 px-5 pb-6 pt-3">
					<CollectionType hasHome={displayPoint.has_home} variant="detail" />

					<div className="h-px bg-blue-tint-2" />

					<div className="flex flex-col gap-4">
						<DetailRow
							icon={<MapPin className="size-[18px] text-blue-bright" />}
							label="Endereço"
							value={address}
						/>
						<DetailRow
							icon={<CalendarClock className="size-[18px] text-blue-bright" />}
							label="Horário"
							value={displayPoint.opening_hours ?? "Não informado"}
						/>
						<DetailRow
							icon={<Phone className="size-[18px] text-blue-bright" />}
							label="Telefone"
							value={
								displayPoint.phone_number
									? formatPhoneNumber(displayPoint.phone_number)
									: "Não informado"
							}
						/>
						<DetailRow
							icon={<Mail className="size-[18px] text-blue-bright" />}
							label="Email"
							value={displayPoint.email || "Não informado"}
						/>
					</div>

					<div className="h-px bg-blue-tint-2" />

					<button
						type="button"
						onClick={handleTraceRoute}
						className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-bright-fill text-[12px] font-bold text-white"
					>
						<Navigation className="size-4" />
						Traçar Rota
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
