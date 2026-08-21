import { ArticlesSection } from "./components/ArticlesSection";
import { CollectionPointsSection } from "./components/CollectionPointsSection";
import { EvaSection } from "./components/EvaSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { LandingFooter } from "./components/LandingFooter";
import { LandingHeader } from "./components/LandingHeader";
import { TestimonialsSection } from "./components/TestimonialsSection";

export function LandingPageScreen() {
	return (
		<div className="min-h-dvh bg-white [&_button]:cursor-pointer">
			<LandingHeader />
			<main>
				<HeroSection />
				<HowItWorksSection />
				<CollectionPointsSection />
				<EvaSection />
				<ArticlesSection />
				<TestimonialsSection />
				<FinalCtaSection />
			</main>
			<LandingFooter />
		</div>
	);
}
