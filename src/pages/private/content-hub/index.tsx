import { useState } from "react";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { ARTICLES, getArticleById } from "@/pages/public/articles/data";
import { EnumUserType } from "@/services/types/i-user";
import { ArticlesGrid } from "./components/ArticlesGrid";
import { ContentHubHeader } from "./components/ContentHubHeader";
import { FaqCard } from "./components/FaqCard";
import { FeaturedSection } from "./components/FeaturedSection";
import { FeaturedVideosSection } from "./components/FeaturedVideosSection";
import { HeroSection } from "./components/HeroSection";
import { NewsletterCta } from "./components/NewsletterCta";
import { QuickTipsCard } from "./components/QuickTipsCard";
import { matchesQuery } from "./utils";

const FEATURED_MAIN_ID = 1;
const FEATURED_MEDIUM_IDS = [2, 3];
const VIDEO_IDS = [1, 7, 8];

export function ContentHubPage() {
	const { auth } = useAuth();
	const [search, setSearch] = useState("");
	const [activeTab, setActiveTab] = useState("artigos");

	const featuredIds = new Set([FEATURED_MAIN_ID, ...FEATURED_MEDIUM_IDS]);
	const mainArticle = getArticleById(FEATURED_MAIN_ID);
	const mediumArticles = FEATURED_MEDIUM_IDS.map((id) => getArticleById(id));
	const videos = VIDEO_IDS.map((id) => getArticleById(id));

	const isSearching = search.trim().length > 0;

	const gridArticles = isSearching
		? ARTICLES.filter((article) => matchesQuery(article, search))
		: ARTICLES.filter((article) => !featuredIds.has(article.id));

	function handleShowAll() {
		setSearch("");
	}

	return (
		<Page hasPermission={auth?.type === EnumUserType.Common}>
			<div className="-m-5 flex flex-col bg-[#eef2f7]">
				<ContentHubHeader
					search={search}
					onSearchChange={setSearch}
					activeTab={activeTab}
					onTabChange={setActiveTab}
				/>

				<main className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 py-8 lg:px-8">
					<HeroSection />

					<div id="artigos" className="scroll-mt-24 flex flex-col gap-8">
						{!isSearching && (
							<FeaturedSection
								mainArticle={mainArticle}
								mediumArticles={mediumArticles}
							/>
						)}

						<ArticlesGrid articles={gridArticles} onShowAll={handleShowAll} />
					</div>

					<FeaturedVideosSection videos={videos} />

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						<QuickTipsCard />
						<FaqCard />
					</div>

					<NewsletterCta />
				</main>
			</div>
		</Page>
	);
}
