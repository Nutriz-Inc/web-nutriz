import { ChevronRight, IdCard } from "lucide-react";
import { DataGrid } from "@/components/full/DataGrid";
import { ExpandableText } from "@/components/full/ExpandableText";
import { getInitials } from "@/components/layout/utils";
import { cn } from "@/lib/utils";
import type { User } from "@/services/types/i-user";
import { formatPhoneNumber } from "@/utils/formatter";

type Props = {
	driverName?: string;
	driver?: User;
	carregando: boolean;
	relato?: string;
	onAbrirPerfil?: () => void;
};

export function RouteDriverCard({
	driverName,
	driver,
	carregando,
	relato,
	onAbrirPerfil,
}: Props) {
	const nome = driver?.name ?? driverName ?? "—";

	const dados = [
		{
			rotulo: "Telefone",
			valor: driver?.phone_number
				? formatPhoneNumber(driver.phone_number)
				: undefined,
		},
		{ rotulo: "E-mail", valor: driver?.email },
	].filter((item) => Boolean(item.valor));

	const identidade = (
		<>
			<span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-tint font-display text-[14px] font-extrabold text-blue-deep">
				{driver || driverName ? (
					getInitials(nome)
				) : (
					<IdCard className="size-5" />
				)}
			</span>

			<span className="flex min-w-0 flex-1 flex-col text-left">
				<span className="truncate text-[15px] font-bold text-ink">{nome}</span>
				<span className="text-[12px] text-ink-2">
					{onAbrirPerfil ? "Ver perfil do motorista" : "Motorista da rota"}
				</span>
			</span>
		</>
	);

	return (
		<section className="flex h-full w-full flex-col lg:flex-row">
			<div className="flex min-w-0 flex-col lg:flex-1">
				{onAbrirPerfil ? (
					<button
						type="button"
						onClick={onAbrirPerfil}
						aria-label={`Abrir o perfil de ${nome}`}
						className="group flex w-full items-center gap-3 p-5 outline-none transition-colors hover:bg-surface-2 focus-visible:ring-4 focus-visible:ring-blue-bright/40"
					>
						{identidade}
						<ChevronRight
							className={cn(
								"size-5 shrink-0 text-ink-2 transition-transform duration-300",
								"group-hover:translate-x-0.5",
							)}
						/>
					</button>
				) : (
					<div className="flex w-full items-center gap-3 p-5">{identidade}</div>
				)}

				{carregando ? (
					<div className="mt-auto border-t border-line p-5">
						<div className="h-10 w-full animate-pulse rounded-xl bg-surface-2" />
					</div>
				) : dados.length > 0 ? (
					<DataGrid
						colunas={2}
						colunasMobile={1}
						className="mt-auto border-t"
						itens={dados.map((item) => ({
							chave: item.rotulo,
							conteudo: (
								<div className="flex flex-col gap-1 px-5 py-4">
									<span className="text-[11px] text-ink-2">{item.rotulo}</span>
									<span className="truncate text-[13px] font-semibold text-ink">
										{item.valor}
									</span>
								</div>
							),
						}))}
					/>
				) : (
					<p className="mt-auto border-t border-line px-5 py-4 text-[13px] text-ink-2">
						Não foi possível carregar os dados do motorista.
					</p>
				)}
			</div>

			<div className="flex flex-col gap-2 border-t border-line p-5 lg:w-[44%] lg:shrink-0 lg:border-t-0 lg:border-l">
				<span className="text-[11px] text-ink-2">Relato do motorista</span>

				{relato ? (
					<ExpandableText texto={relato} linhas={5} />
				) : (
					<p className="text-[13px] leading-relaxed text-ink-2">
						Registrado quando o motorista finaliza a rota.
					</p>
				)}
			</div>
		</section>
	);
}
