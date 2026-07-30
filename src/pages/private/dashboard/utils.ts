import type { PeriodPreset } from "./constants";

function toIsoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}

export function getPeriodPresetRange(preset: Exclude<PeriodPreset, "custom">): {
	start_date: string;
	end_date: string;
} {
	const now = new Date();
	const end_date = toIsoDate(now);

	switch (preset) {
		case "month":
			return {
				start_date: toIsoDate(new Date(now.getFullYear(), now.getMonth(), 1)),
				end_date,
			};
		case "quarter":
			return {
				start_date: toIsoDate(
					new Date(now.getFullYear(), now.getMonth() - 2, 1),
				),
				end_date,
			};
		case "semester":
			return {
				start_date: toIsoDate(
					new Date(now.getFullYear(), now.getMonth() - 5, 1),
				),
				end_date,
			};
		case "year":
			return {
				start_date: toIsoDate(new Date(now.getFullYear(), 0, 1)),
				end_date,
			};
	}
}

export function toPercent(rate: number): number {
	const percent = rate > 1 ? rate : rate * 100;
	return Math.max(0, Math.min(100, Math.round(percent)));
}
