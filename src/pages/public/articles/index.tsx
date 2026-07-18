import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticleById } from "@/data/articles";
import { ArticlesHeader } from "./components/ArticlesHeader";

export function ArticlesScreen() {
	const [searchParams, setSearchParams] = useSearchParams();
	const article = getArticleById(Number(searchParams.get("a")));

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, []);

	function handleSelectArticle(id: number) {
		setSearchParams({ a: String(id) });
		window.scrollTo({ top: 0, behavior: "instant" });
	}

	return (
		<div className="min-h-screen bg-[#eef2f7] [&_button]:cursor-pointer">
			<ArticlesHeader onSelectArticle={handleSelectArticle} />

			<main className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-5 py-6 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:px-8 lg:py-8">
				<article className="rounded-xl border border-[#e4e4e7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-7">
					<h1 className="text-[26px] font-bold leading-[1.25] text-[#09090b]">
						{article.title}
					</h1>
				</article>

				<aside
					aria-label="Complementos do artigo"
					className="flex flex-col gap-5"
				/>
			</main>
		</div>
	);
}
