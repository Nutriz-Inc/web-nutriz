import type { BabyDraft } from "./components/NewBabyCard";

export function createDraft(): BabyDraft {
	return { key: crypto.randomUUID(), name: "", birth_date: "" };
}
