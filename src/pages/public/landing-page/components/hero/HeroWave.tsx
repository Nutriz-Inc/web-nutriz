import { SectionWave } from "../SectionWave";

export function HeroWave() {
	return (
		<SectionWave
			nome="hero"
			corDeBaixoClassName="text-surface-2"
			className="absolute inset-x-0 bottom-0 box-content h-[8.25rem] border-b-[1.5px] border-surface-2 bg-[linear-gradient(180deg,transparent_58%,var(--surface-2)_82%)] sm:h-40 lg:h-48"
		/>
	);
}
