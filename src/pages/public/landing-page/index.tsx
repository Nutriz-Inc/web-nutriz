import { ArticlesSection } from "./components/ArticlesSection";
import { CollectionPointsSection } from "./components/CollectionPointsSection";
import { EvaSection } from "./components/EvaSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { LandingFooter } from "./components/LandingFooter";
import { LandingHeader } from "./components/LandingHeader";
import { SectionRibbon } from "./components/SectionRibbon";
import { SectionWave } from "./components/SectionWave";
import { TestimonialsSection } from "./components/TestimonialsSection";

const ALTURA_DA_ONDA = "h-24 sm:h-32 lg:h-40";

export function LandingPageScreen() {
	return (
		<div className="min-h-dvh bg-surface [&_button]:cursor-pointer">
			<LandingHeader />
			<main id="conteudo" tabIndex={-1}>
				<HeroSection />
				<div className="flex flex-col bg-surface-2">
					<HowItWorksSection />
				</div>
				<SectionRibbon
					nome="passos-pontos"
					fundoClassName="bg-surface-2"
					corDeCimaClassName="text-surface-2"
					corDeBaixoClassName="text-surface"
					className="h-36 sm:h-44 lg:h-52"
				/>
				<CollectionPointsSection />
				<SectionRibbon
					nome="pontos-eva"
					fundoClassName="bg-surface"
					corDeCimaClassName="text-surface"
					corDeBaixoClassName="text-surface"
					className="h-36 sm:h-44 lg:h-52"
				/>
				<EvaSection />
				<SectionWave
					nome="eva-artigos"
					fundoClassName="bg-surface"
					corDeBaixoClassName="text-blue-deep-fill"
					className={ALTURA_DA_ONDA}
				/>
				<ArticlesSection />
				<SectionWave
					nome="artigos-depoimentos"
					fundoClassName="bg-blue-deep-fill"
					corDeBaixoClassName="text-surface"
					className={ALTURA_DA_ONDA}
				/>
				<TestimonialsSection />
				<SectionRibbon
					nome="depoimentos-final"
					fundoClassName="bg-surface"
					corDeCimaClassName="text-surface"
					corDeBaixoClassName="text-surface-2"
					className="h-36 sm:h-44 lg:h-52"
				/>
				<FinalCtaSection />
			</main>
			<LandingFooter />
		</div>
	);
}
