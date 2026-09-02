import { IdCard, Mail, Phone, UserRound } from "lucide-react";
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
			icone: <Phone className="size-4 shrink-0 text-ink-2" />,
			rotulo: "Telefone",
			valor: driver?.phone_number
				? formatPhoneNumber(driver.phone_number)
				: undefined,
		},
		{
			icone: <Mail className="size-4 shrink-0 text-ink-2" />,
			rotulo: "E-mail",
			valor: driver?.email,
		},
		{
			icone: <IdCard className="size-4 shrink-0 text-ink-2" />,
			rotulo: "CPF",
			valor: driver?.cpf ? formatCpf(driver.cpf) : undefined,
		},
		{
			icone: <UserRound className="size-4 shrink-0 text-ink-2" />,
			rotulo: "Nascimento",
			valor: driver?.birth_date ? formatDateBR(driver.birth_date) : undefined,
		},
	].filter((item) => Boolean(item.valor));

	return (
		<section className="flex w-full flex-col gap-4 rounded-2xl bg-surface p-5 shadow-soft lg:rounded-3xl lg:p-6">
			<h2 className="font-display text-xs font-bold uppercase tracking-[0.06em] text-blue-bright">
				Motorista
			</h2>

			<div className="flex items-center gap-3">
				<span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-tint text-[15px] font-bold text-blue-deep">
					{getInitials(nome)}
				</span>
				<p className="min-w-0 truncate text-[16px] font-bold text-ink">
					{nome}
				</p>
			</div>

			{carregando ? (
				<div className="h-16 w-full animate-pulse rounded-xl bg-surface-2" />
			) : dados.length > 0 ? (
				<div className="flex flex-col gap-2.5">
					{dados.map((item) => (
						<div key={item.rotulo} className="flex items-center gap-2.5">
							{item.icone}
							<span className="text-[13px] text-ink-2">{item.rotulo}</span>
							<span className="ml-auto min-w-0 truncate text-[14px] font-semibold text-ink">
								{item.valor}
							</span>
						</div>
					))}
				</div>
			) : (
				<p className="text-[13px] text-ink-2">
					Não foi possível carregar os dados do motorista.
				</p>
			)}
		</section>
	);
}
