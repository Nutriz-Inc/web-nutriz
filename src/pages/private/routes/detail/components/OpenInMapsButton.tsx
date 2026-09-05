import { ExternalLink, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IRouteStop } from "@/services/types/i-route";
import { urlDoGoogleMaps } from "../utils";

type Props = {
	stops: IRouteStop[];
	compacto?: boolean;
	className?: string;
};

export function OpenInMapsButton({
	stops,
	compacto = false,
	className,
}: Props) {
	const url = urlDoGoogleMaps(stops);

	if (!url) {
		return null;
	}

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"flex shrink-0 items-center gap-1.5 rounded-full border border-blue-tint-2 bg-surface font-semibold text-blue-deep outline-none transition-colors hover:bg-blue-tint focus-visible:ring-4 focus-visible:ring-blue-bright/50",
				compacto ? "h-7 px-2.5 text-[12px]" : "h-9 px-3.5 text-[13px]",
				className,
			)}
		>
			<Navigation className={compacto ? "size-3.5" : "size-4"} />
			Google Maps
			<ExternalLink
				className={cn("opacity-70", compacto ? "size-3" : "size-3.5")}
			/>
		</a>
	);
}
