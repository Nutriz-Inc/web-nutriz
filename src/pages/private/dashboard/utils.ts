import { formatDateBR } from "@/utils/formatter";
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

export function formatDecimal(value: number, fractionDigits = 1): string {
	return value.toLocaleString("pt-BR", {
		maximumFractionDigits: fractionDigits,
	});
}

export function formatOptionalDecimal(
	value: number | null | undefined,
	suffix = "",
	fractionDigits = 1,
): string {
	if (value == null) return "—";

	return `${formatDecimal(value, fractionDigits)}${suffix}`;
}

export function descreverPeriodo(params: {
	start_date?: string;
	end_date?: string;
}): string {
	if (!params.start_date || !params.end_date) {
		return "Todo o histórico";
	}

	return `${formatDateBR(params.start_date)} a ${formatDateBR(params.end_date)}`;
}

export function descreverEmissao(data: Date): string {
	const dia = data.toLocaleDateString("pt-BR");
	const hora = data.toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return `${dia} às ${hora}`;
}
