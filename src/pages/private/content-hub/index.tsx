import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { ARTICLES, getArticleById } from "@/pages/public/articles/data";
import { EnumUserType } from "@/services/types/i-user";
import { ArticlesGrid } from "./components/ArticlesGrid";
import { FaqCard } from "./components/FaqCard";
import { FeaturedSection } from "./components/FeaturedSection";
import { FeaturedVideosSection } from "./components/FeaturedVideosSection";
import { QuickTipsCard } from "./components/QuickTipsCard";
import { FEATURED_IDS, FEATURED_MAIN_ID, FEATURED_MEDIUM_IDS, VIDEO_IDS } from "./constants";

export function ContentHubPage() {
	const { auth } = useAuth();

	const mainArticle = getArticleById(FEATURED_MAIN_ID);
	const mediumArticles = FEATURED_MEDIUM_IDS.map((id) => getArticleById(id));
	const videos = VIDEO_IDS.map((id) => getArticleById(id));
	const gridArticles = ARTICLES.filter(
		(article) => !FEATURED_IDS.has(article.id),
	);

	return (
		<div className="mx-auto w-full max-w-[1200px]">
			<Page
				title="Conteúdo educativo"
				description="Artigos, vídeos e guias práticos para acompanhar você em cada etapa da doação de leite materno."
				hasPermission={auth?.type === EnumUserType.Common}
			>
				<div className="flex flex-col gap-10">
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
				</div>
			</Page>
		</div>
	);
}
