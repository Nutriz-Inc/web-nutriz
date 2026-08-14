import { EVA_SUGGESTIONS } from "../constants";

type SuggestionChipsProps = {
	onSelect: (suggestion: string) => void;
};

// Chips "Comece por aqui" da tela de boas-vindas: clicar envia a pergunta.
// Grade de 2 colunas para a tela inicial caber sem scroll.
export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: 8,
				width: "100%",
			}}
		>
			{EVA_SUGGESTIONS.map((suggestion) => (
				<button
					key={suggestion}
					type="button"
					className="eva-chip"
					onClick={() => onSelect(suggestion)}
				>
					{suggestion}
				</button>
			))}
		</div>
	);
}
