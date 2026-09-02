import { ExternalLink, Navigation } from "lucide-react";
import type { IRouteStop } from "@/services/types/i-route";
import { urlDoGoogleMaps } from "../utils";

type Props = {
	stops: IRouteStop[];
};

export function OpenInMapsButton({ stops }: Props) {
	const url = urlDoGoogleMaps(stops);

	if (!url) {
		return null;
	}

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-blue-tint-2 bg-surface px-3.5 text-[13px] font-semibold text-blue-deep outline-none transition-colors hover:bg-blue-tint focus-visible:ring-4 focus-visible:ring-blue-bright/50"
		>
			<Navigation className="size-4" />
			Google Maps
			<ExternalLink className="size-3.5 opacity-70" />
		</a>
	);
}
