const SUGGESTIONS = [
	"Posso doar leite?",
	"Como fazer a ordenha?",
	"Como armazenar o leite?",
];

type SuggestionChipsProps = {
	desktop?: boolean;
	onSelect: (suggestion: string) => void;
};

export function SuggestionChips({ desktop, onSelect }: SuggestionChipsProps) {
	return (
		<div
			style={
				desktop
					? { display: "flex", gap: 10 }
					: {
							display: "flex",
							flexWrap: "wrap",
							gap: 10,
							justifyContent: "center",
						}
			}
		>
			{SUGGESTIONS.map((suggestion) => (
				<button
					key={suggestion}
					type="button"
					className={desktop ? "eva-chip eva-chip--desktop" : "eva-chip"}
					onClick={() => onSelect(suggestion)}
				>
					{suggestion}
				</button>
			))}
		</div>
	);
}
