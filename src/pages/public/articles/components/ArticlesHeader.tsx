import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ARTICLES } from "../data";
import { normalizeText } from "../utils";

type ArticlesHeaderProps = {
	onSelectArticle: (id: number) => void;
};

export function ArticlesHeader({ onSelectArticle }: ArticlesHeaderProps) {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const [query, setQuery] = useState("");

	// Esta tela é acessível tanto pelo publicRouter (visitante) quanto pelo
	// routerPrivate (usuária logada, vinda da Central de Conteúdos) — o
	// destino e o texto do "Voltar" mudam conforme o contexto.
	const backTo = isAuthenticated ? "/conteudo-educativo" : "/";
	const backLabel = isAuthenticated
		? "Voltar para conteúdo educativo"
		: "Voltar para a página inicial";

	const results = query.trim()
		? ARTICLES.filter((article) =>
				normalizeText(article.title).includes(normalizeText(query.trim())),
			)
		: [];

	function handleSelect(id: number) {
		setQuery("");
		onSelectArticle(id);
	}

	return (
		<header className="sticky top-0 z-40 h-14 bg-[#0d3b6e]">
			<div className="mx-auto flex h-full w-full max-w-[1100px] items-center justify-between gap-4 px-5 lg:px-8">
				<button
					type="button"
					onClick={() => navigate(backTo)}
					className="flex min-h-11 shrink-0 items-center gap-2 rounded-lg text-[14px] font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					<ArrowLeft className="size-4" aria-hidden />
					<span className="hidden sm:inline">{backLabel}</span>
					<span className="sm:hidden">Voltar</span>
				</button>

				<div className="relative w-full max-w-[220px] sm:max-w-[260px]">
					<Search
						className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
						aria-hidden
					/>
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Buscar artigos..."
						aria-label="Buscar artigos"
						className="h-9 w-full rounded-full bg-white/12 pl-9 pr-4 text-[13px] text-white outline-none placeholder:text-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					/>

					{results.length > 0 && (
						<ul className="absolute right-0 top-11 w-[280px] overflow-hidden rounded-xl border border-[#e4e4e7] bg-white shadow-lg">
							{results.map((article) => (
								<li key={article.id}>
									<button
										type="button"
										onClick={() => handleSelect(article.id)}
										className="flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors duration-150 hover:bg-[#eef2f7] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0d3b6e]"
									>
										<span className="text-[13px] font-semibold text-[#09090b]">
											{article.title}
										</span>
										<span className="text-[11.5px] text-[#71717a]">
											{article.category} · {article.readTimeMinutes} min
										</span>
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</header>
	);
}
