import type { Bottle, BottleUpdateBase } from "@/services/types/i-donation";

export function emptyBottle(): BottleUpdateBase {
	return { quantity_donated_ml: 0, discarded: false, description: "" };
}

export function sumBottlesMl(
	bottles: Array<Pick<Bottle, "quantity_donated_ml" | "discarded">>,
	{ includeDiscarded = false } = {},
): number {
	return bottles.reduce((total, bottle) => {
		if (!includeDiscarded && bottle.discarded) return total;
		return total + (bottle.quantity_donated_ml ?? 0);
	}, 0);
}

export function bottlesAreValid(bottles: BottleUpdateBase[]): boolean {
	if (bottles.length === 0) return false;

	return bottles.every((bottle) => {
		if (
			bottle.quantity_donated_ml == null ||
			Number.isNaN(bottle.quantity_donated_ml) ||
			bottle.quantity_donated_ml < 0
		) {
			return false;
		}
		if (bottle.discarded && !bottle.description?.trim()) return false;
		return true;
	});
}

export function normalizeBottlesPayload(
	bottles: BottleUpdateBase[],
): BottleUpdateBase[] {
	return bottles.map((bottle) => ({
		quantity_donated_ml: bottle.quantity_donated_ml,
		discarded: bottle.discarded ?? false,
		...(bottle.discarded && bottle.description?.trim()
			? { description: bottle.description.trim() }
			: {}),
	}));
}
