import type { Address } from "@/services/types/i-user";
import { formatZipCode } from "@/utils/formatter";
import { formatAddressLine } from "../utils";

type Props = {
	addresses: Address[];
	mode: "existing" | "new";
	selectedAddressId: string;
	onSelectExisting: (id: string) => void;
	onSelectNew: () => void;
	zipCode: string;
	onZipCodeChange: (value: string) => void;
	number: string;
	onNumberChange: (value: string) => void;
	complement: string;
	onComplementChange: (value: string) => void;
};

export function StepAddressPicker({
	addresses,
	mode,
	selectedAddressId,
	onSelectExisting,
	onSelectNew,
	zipCode,
	onZipCodeChange,
	number,
	onNumberChange,
	complement,
	onComplementChange,
}: Props) {
	return (
		<div className="flex flex-col gap-2">
			<span className="text-[12px] font-semibold text-[#6b7280]">Endereço</span>

			{addresses.length > 0 && (
				<select
					value={mode === "existing" ? selectedAddressId : "new"}
					onChange={(event) => {
						if (event.target.value === "new") {
							onSelectNew();
						} else {
							onSelectExisting(event.target.value);
						}
					}}
					className="w-full rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3 text-[14px] text-[#1f2a37] outline-none"
				>
					{addresses.map((address) => (
						<option key={address.id_address} value={address.id_address}>
							{formatAddressLine(address)}
						</option>
					))}
					<option value="new">Outro endereço...</option>
				</select>
			)}

			{(mode === "new" || addresses.length === 0) && (
				<div className="flex flex-col gap-2 lg:flex-row">
					<input
						value={zipCode}
						onChange={(event) =>
							onZipCodeChange(formatZipCode(event.target.value))
						}
						placeholder="CEP"
						inputMode="numeric"
						className="flex-1 rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3 text-[14px] text-[#1f2a37] outline-none placeholder:text-[#9ca3af]"
					/>
					<input
						value={number}
						onChange={(event) => onNumberChange(event.target.value)}
						placeholder="Número"
						className="rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3 text-[14px] text-[#1f2a37] outline-none placeholder:text-[#9ca3af] lg:w-32"
					/>
					<input
						value={complement}
						onChange={(event) => onComplementChange(event.target.value)}
						placeholder="Complemento"
						className="flex-1 rounded-[10px] border-[1.5px] border-[#54b2e3] bg-white px-3.5 py-3 text-[14px] text-[#1f2a37] outline-none placeholder:text-[#9ca3af]"
					/>
				</div>
			)}
		</div>
	);
}
