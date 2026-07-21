import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { ARTICLES, getArticleById } from "@/pages/public/articles/data";
import { EnumUserType } from "@/services/types/i-user";
import { ArticlesGrid } from "./components/ArticlesGrid";
import { FaqCard } from "./components/FaqCard";
import { FeaturedSection } from "./components/FeaturedSection";
import { FeaturedVideosSection } from "./components/FeaturedVideosSection";
import { HeroSection } from "./components/HeroSection";
import { NewsletterCta } from "./components/NewsletterCta";
import { QuickTipsCard } from "./components/QuickTipsCard";

const FEATURED_MAIN_ID = 1;
const FEATURED_MEDIUM_IDS = [2, 3];
const VIDEO_IDS = [1, 7, 8];
const FEATURED_IDS = new Set([FEATURED_MAIN_ID, ...FEATURED_MEDIUM_IDS]);

export function ContentHubPage() {
	const { auth } = useAuth();

	const mainArticle = getArticleById(FEATURED_MAIN_ID);
	const mediumArticles = FEATURED_MEDIUM_IDS.map((id) => getArticleById(id));
	const videos = VIDEO_IDS.map((id) => getArticleById(id));
	const gridArticles = ARTICLES.filter(
		(article) => !FEATURED_IDS.has(article.id),
	);

	return (
		<Page hasPermission={auth?.type === EnumUserType.Common}>
			<div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
				<HeroSection />

				<FeaturedSection
					mainArticle={mainArticle}
					mediumArticles={mediumArticles}
				/>

				<ArticlesGrid articles={gridArticles} />

				<FeaturedVideosSection videos={videos} />

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<QuickTipsCard />
					<FaqCard />
				</div>

				<NewsletterCta />
			</div>
		</Page>
	);
}
