import { Calendar, Clock } from "lucide-react";
import type { Address } from "@/services/types/i-user";
import { StepAddressPicker } from "./StepAddressPicker";

type Props = {
	date: string;
	onDateChange: (value: string) => void;
	time: string;
	onTimeChange: (value: string) => void;
	donorAddresses: Address[];
	addressMode: "existing" | "new";
	selectedAddressId: string;
	onSelectExisting: (id: string) => void;
	onSelectNew: () => void;
	zipCode: string;
	onZipCodeChange: (value: string) => void;
	number: string;
	onNumberChange: (value: string) => void;
	complement: string;
	onComplementChange: (value: string) => void;
	description: string;
	onDescriptionChange: (value: string) => void;
	isPending: boolean;
	onCreate: () => void;
};

export function StepCreateForm({
	date,
	onDateChange,
	time,
	onTimeChange,
	donorAddresses,
	addressMode,
	selectedAddressId,
	onSelectExisting,
	onSelectNew,
	zipCode,
	onZipCodeChange,
	number,
	onNumberChange,
	complement,
	onComplementChange,
	description,
	onDescriptionChange,
	isPending,
	onCreate,
}: Props) {
	return (
		<div className="flex flex-col gap-3.5">
			<p className="text-[11px] font-bold tracking-[0.6px] text-[#00458b]">
				AGENDAR ETAPA
			</p>

			<div className="flex flex-col gap-3.5 lg:flex-row">
				<label className="flex flex-1 flex-col gap-1.5">
					<span className="text-[12px] font-semibold text-[#6b7280]">
						Data do agendamento
					</span>
					<div className="flex items-center gap-2 rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3">
						<Calendar className="size-4 shrink-0 text-[#00458b]" />
						<input
							type="date"
							value={date}
							onChange={(event) => onDateChange(event.target.value)}
							className="w-full bg-transparent text-[14px] text-[#1f2a37] outline-none"
						/>
					</div>
				</label>

				<label className="flex flex-1 flex-col gap-1.5">
					<span className="text-[12px] font-semibold text-[#6b7280]">
						Horário do agendamento
					</span>
					<div className="flex items-center gap-2 rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3">
						<Clock className="size-4 shrink-0 text-[#00458b]" />
						<input
							type="time"
							value={time}
							onChange={(event) => onTimeChange(event.target.value)}
							className="w-full bg-transparent text-[14px] text-[#1f2a37] outline-none"
						/>
					</div>
				</label>
			</div>

			<StepAddressPicker
				addresses={donorAddresses}
				mode={addressMode}
				selectedAddressId={selectedAddressId}
				onSelectExisting={onSelectExisting}
				onSelectNew={onSelectNew}
				zipCode={zipCode}
				onZipCodeChange={onZipCodeChange}
				number={number}
				onNumberChange={onNumberChange}
				complement={complement}
				onComplementChange={onComplementChange}
			/>

			<label className="flex flex-col gap-1.5">
				<span className="text-[12px] font-semibold text-[#6b7280]">
					Descrição da etapa
				</span>
				<textarea
					value={description}
					onChange={(event) => onDescriptionChange(event.target.value)}
					rows={2}
					placeholder="Descreva o que será feito nesta etapa"
					className="rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3 text-[14px] text-[#1f2a37] outline-none placeholder:text-[#9ca3af]"
				/>
			</label>

			<button
				type="button"
				onClick={onCreate}
				disabled={isPending || !date || !description}
				className="self-start rounded-[10px] bg-[#00458b] px-5 py-2.5 text-[14px] font-bold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
			>
				Agendar etapa
			</button>
		</div>
	);
}
