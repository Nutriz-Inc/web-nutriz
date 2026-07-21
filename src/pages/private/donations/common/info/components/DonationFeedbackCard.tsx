import { useState } from "react";
import { StarRating } from "./StarRating";

type Props = {
	hasError: boolean;
	feedback?: string;
	scoreFeedback?: number;
	isPending: boolean;
	onSubmit: (feedback: string, score: number) => void;
};

export function DonationFeedbackCard({
	hasError,
	feedback,
	scoreFeedback,
	isPending,
	onSubmit,
}: Props) {
	const [value, setValue] = useState("");
	const [score, setScore] = useState(0);

	if (feedback) {
		return (
			<div className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-[0px_6px_10px_rgba(10,38,77,0.04)]">
				<div className="flex items-center gap-2">
					<span className="text-[13px] font-bold text-[#0e2a45]">
						Seu feedback
					</span>
				</div>
				{scoreFeedback != null && (
					<StarRating value={scoreFeedback} size="sm" />
				)}
				<p className="text-[14px] leading-6 text-[#33536f]">{feedback}</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0px_6px_10px_rgba(10,38,77,0.04)]">
			<div className="flex flex-col gap-1">
				<p className="text-[15px] font-bold text-[#0e2a45]">
					{hasError ? "Sua doação foi encerrada" : "Sua doação foi concluída"}
				</p>
				<p className="text-[13px] text-[#6b8faa]">
					Conte pra gente como foi a sua experiência.
				</p>
			</div>

			<StarRating value={score} onChange={setScore} />

			<textarea
				value={value}
				onChange={(event) => setValue(event.target.value)}
				rows={3}
				placeholder="Escreva aqui o seu feedback"
				className="rounded-[10px] border border-[#e5ebf3] bg-[#f6f8fd] px-3 py-2 text-[14px] text-[#0e2a45] outline-none placeholder:text-[#9aa3b8]"
			/>

			<button
				type="button"
				onClick={() => onSubmit(value, score)}
				disabled={!value || !score || isPending}
				className="self-end rounded-full bg-[#00458b] px-5 py-2.5 text-[13px] font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
			>
				Enviar feedback
			</button>
		</div>
	);
}
