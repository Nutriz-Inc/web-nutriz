import { motion } from "framer-motion";
import { Crosshair, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer } from "../animations/variants";
import {
	COLLECTION_POINTS,
	type CollectionPoint,
	POINT_FILTERS,
	type PointTagTone,
} from "../data/landing-content";
import { useReveal } from "../hooks/use-reveal";
import { SectionLabel } from "./SectionLabel";

const TAG_TONES: Record<PointTagTone, string> = {
	open: "bg-[#e5f6ee] text-[#12a35f]",
	closed: "bg-[#fdecec] text-[#d64545]",
	donation: "bg-[#edf3ff] text-[#387ccd]",
	pickup: "bg-[#e8fcf9] text-[#0f6e56]",
};

function PointCard({
	point,
	selected,
	onSelect,
}: {
	point: CollectionPoint;
	selected: boolean;
	onSelect: () => void;
}) {
	return (
		<motion.button
			type="button"
			variants={fadeUp}
			onClick={onSelect}
			className={cn(
				"flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors",
				selected
					? "border-[#387ccd] bg-[#387ccd]/10"
					: "border-[#e6ecf5] bg-white hover:border-[#c7d6f0]",
			)}
		>
			<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#387ccd]/20">
				<MapPin className="size-[20px] text-[#387ccd]" />
			</div>

			<div className="flex min-w-0 flex-1 flex-col gap-1.5">
				<div className="flex items-start justify-between gap-2">
					<p className="text-[14px] font-bold text-[#12294d]">{point.name}</p>
					<span className="shrink-0 text-[11px] text-[#94a3b8]">
						{point.distance}
					</span>
				</div>
				<p className="text-[12px] text-[#94a3b8]">{point.address}</p>
				<div className="flex flex-wrap items-center gap-1.5">
					{point.tags.map((tag) => (
						<span
							key={tag.label}
							className={cn(
								"rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
								TAG_TONES[tag.tone],
							)}
						>
							{tag.label}
						</span>
					))}
				</div>
			</div>
		</motion.button>
	);
}

function MapPlaceholder() {
	const blocks = [
		"left-[8%] top-[12%] h-16 w-24",
		"left-[42%] top-[8%] h-20 w-28",
		"left-[74%] top-[16%] h-16 w-20",
		"left-[10%] top-[52%] h-20 w-28",
		"left-[46%] top-[54%] h-16 w-24",
		"left-[72%] top-[58%] h-20 w-24",
	];
	const pins = [
		{ className: "left-[16%] top-[26%]", color: "#0e9e94" },
		{ className: "left-[52%] top-[36%]", color: "#0e9e94" },
		{ className: "left-[30%] top-[62%]", color: "#f2579f" },
		{ className: "left-[68%] top-[66%]", color: "#0e9e94" },
	];

	return (
		<div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-[#e8eef7] lg:h-full lg:min-h-[420px]">
			{blocks.map((block) => (
				<span
					key={block}
					className={cn("absolute rounded-lg bg-[#d5deec]", block)}
				/>
			))}

			{pins.map((pin) => (
				<span
					key={pin.className}
					className={cn(
						"absolute -translate-x-1/2 -translate-y-full",
						pin.className,
					)}
				>
					<MapPin
						className="size-7 drop-shadow"
						style={{ color: pin.color }}
						fill={pin.color}
						stroke="#ffffff"
						strokeWidth={1.5}
					/>
				</span>
			))}

			<button
				type="button"
				aria-label="Usar minha localização"
				className="absolute bottom-4 right-4 inline-flex size-10 items-center justify-center rounded-full bg-white text-[#387ccd] shadow-md transition-colors hover:bg-[#f1f5fb]"
			>
				<Crosshair className="size-5" />
			</button>
		</div>
	);
}

export function CollectionPointsSection() {
	const [activeFilter, setActiveFilter] = useState(POINT_FILTERS[0]);
	const [selectedId, setSelectedId] = useState("santa-casa-2");

	const headerReveal = useReveal();
	const bodyReveal = useReveal(staggerContainer);

	return (
		<section
			id="pontos-de-coleta"
			className="scroll-mt-20 bg-white py-20 lg:py-24"
		>
			<div className="mx-auto w-full max-w-[1200px] px-5 lg:px-8">
				<motion.div
					{...headerReveal}
					className="flex flex-col items-center gap-3 text-center"
				>
					<SectionLabel color="#387ccd">PONTOS DE COLETA</SectionLabel>
					<h2 className="max-w-2xl text-[30px] font-extrabold tracking-tight text-[#12294d] lg:text-[38px]">
						Encontre um banco de leite perto de você
					</h2>
				</motion.div>

				<div className="mt-10 flex flex-col gap-4">
					<div className="relative">
						<Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#94a3b8]" />
						<input
							type="search"
							placeholder="Buscar ponto de coleta"
							className="h-12 w-full rounded-xl border border-[#e6ecf5] bg-[#f8fafc] pl-11 pr-4 text-[15px] text-[#12294d] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#387ccd] focus:ring-2 focus:ring-[#387ccd]/15"
						/>
					</div>

					<div className="flex gap-2 overflow-x-auto pb-1">
						{POINT_FILTERS.map((filter) => {
							const active = filter === activeFilter;
							return (
								<button
									key={filter}
									type="button"
									onClick={() => setActiveFilter(filter)}
									className={cn(
										"shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-colors",
										active
											? "border-[#387ccd] bg-[#387ccd] text-white"
											: "border-[#e6ecf5] bg-white font-medium text-[#64748b] hover:border-[#c7d6f0]",
									)}
								>
									{filter}
								</button>
							);
						})}
					</div>
				</div>

				<motion.div
					{...bodyReveal}
					className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-stretch"
				>
					<motion.div variants={fadeUp}>
						<MapPlaceholder />
					</motion.div>

					<div className="flex flex-col gap-3">
						{COLLECTION_POINTS.map((point) => (
							<PointCard
								key={point.id}
								point={point}
								selected={point.id === selectedId}
								onSelect={() => setSelectedId(point.id)}
							/>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
