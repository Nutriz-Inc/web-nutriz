import { randomId } from "@/utils/random-id";
import type { BabyDraft } from "./components/NewBabyCard";

export const PROFILE_TABS_ID = "perfil";

export function createDraft(): BabyDraft {
	return { key: randomId(), name: "", birth_date: "" };
}
