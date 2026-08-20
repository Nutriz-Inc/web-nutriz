import { LocateFixed } from "lucide-react";

export function LocateButton({ onClick }: { onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label="Trocar endereço de busca"
			className="absolute bottom-3 right-3 z-[1000] flex size-9 items-center justify-center rounded-full border border-line bg-white shadow-soft"
		>
			<LocateFixed className="size-5 text-blue-bright" />
		</button>
	);
}
