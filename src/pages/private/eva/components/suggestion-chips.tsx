import { EVA_SUGGESTIONS } from "../constants";

type SuggestionChipsProps = {
	onSelect: (suggestion: string) => void;
	disabled?: boolean;
};

// Chips "Comece por aqui" da tela de boas-vindas: clicar envia a pergunta.
export function SuggestionChips({ onSelect, disabled }: SuggestionChipsProps) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				gap: 10,
			}}
		>
			{EVA_SUGGESTIONS.map((suggestion) => (
				<button
					key={suggestion}
					type="button"
					className="eva-chip"
					onClick={() => onSelect(suggestion)}
					disabled={disabled}
				>
					{suggestion}
				</button>
			))}
		</div>
	);
}
