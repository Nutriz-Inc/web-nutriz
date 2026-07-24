import {
	STEP_DEFINITIONS,
	type StepDefinition,
} from "@/pages/private/donations/common/info/constants";

const STOP_WORDS = new Set(["de", "do", "da", "o", "a", "e", "no", "na"]);

function tokenize(value: string): string[] {
	return value
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.split(/[^a-z0-9]+/)
		.filter((token) => token && !STOP_WORDS.has(token));
}

function tokensMatch(a: string, b: string): boolean {
	if (a === b) return true;
	const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a];
	return shorter.length >= 4 && longer.startsWith(shorter);
}

export function findStepDefinition(
	jobName: string,
): StepDefinition | undefined {
	const tokens = tokenize(jobName);
	if (tokens.length === 0) return undefined;

	let best: { definition: StepDefinition; score: number } | undefined;

	for (const definition of STEP_DEFINITIONS) {
		const target = tokenize(definition.name);
		const score = tokens.filter((token) =>
			target.some((candidate) => tokensMatch(token, candidate)),
		).length;

		if (score > 0 && (!best || score > best.score)) {
			best = { definition, score };
		}
	}

	return best?.definition;
}
