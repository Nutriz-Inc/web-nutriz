import { DataGrid } from "@/components/full/DataGrid";
import { getInitials } from "@/components/layout/utils";
import type { User } from "@/services/types/i-user";
import { formatCpf, formatDateBR, formatPhoneNumber } from "@/utils/formatter";

type Props = {
	driverName?: string;
	driver?: User;
	carregando: boolean;
};

export function RouteDriverCard({ driverName, driver, carregando }: Props) {
	const nome = driver?.name ?? driverName ?? "—";

	const dados = [
		{
			rotulo: "Telefone",
			valor: driver?.phone_number
				? formatPhoneNumber(driver.phone_number)
				: undefined,
		},
		{ rotulo: "E-mail", valor: driver?.email },
		{ rotulo: "CPF", valor: driver?.cpf ? formatCpf(driver.cpf) : undefined },
		{
			rotulo: "Nascimento",
			valor: driver?.birth_date ? formatDateBR(driver.birth_date) : undefined,
		},
	].filter((item) => Boolean(item.valor));

	return (
		<section className="flex w-full flex-col">
			<div className="flex items-center gap-3 p-5">
				<span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-tint text-[15px] font-bold text-blue-deep">
					{getInitials(nome)}
				</span>
				<div className="flex min-w-0 flex-col">
					<p className="truncate text-[15px] font-bold text-ink">{nome}</p>
					<span className="text-[12px] text-ink-2">Motorista da rota</span>
				</div>
			</div>

			{carregando ? (
				<div className="border-t border-line p-5">
					<div className="h-12 w-full animate-pulse rounded-xl bg-surface-2" />
				</div>
			) : dados.length > 0 ? (
				<DataGrid
					colunas={2}
					colunasMobile={2}
					className="border-y"
					itens={dados.map((item) => ({
						chave: item.rotulo,
						conteudo: (
							<div className="flex flex-col gap-1 px-4 py-3.5">
								<span className="text-[11px] text-ink-2">{item.rotulo}</span>
								<span className="truncate text-[13px] font-semibold text-ink">
									{item.valor}
								</span>
							</div>
						),
					}))}
				/>
			) : (
				<p className="border-t border-line px-5 py-4 text-[13px] text-ink-2">
					Não foi possível carregar os dados do motorista.
				</p>
			)}
		</section>
	);
}
