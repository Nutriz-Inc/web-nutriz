import { Check } from "lucide-react";

import {
	AVATAR_COLORS,
	type AvatarColorKey,
	useAvatarColor,
} from "@/hooks/use-avatar-color";
import { cn } from "@/lib/utils";

type AvatarColorPickerProps = {
	idUser: string | undefined;
	className?: string;
};

/**
 * Paleta para a nutriz escolher a cor da bolinha de iniciais. Sao os tints do
 * design system, entao a bolinha nunca sai da paleta do produto.
 */
export function AvatarColorPicker({
	idUser,
	className,
}: AvatarColorPickerProps) {
	const { key, setKey } = useAvatarColor(idUser);

	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<p className="text-[12px] font-semibold text-ink-2">Cor do seu avatar</p>

			<div
				role="radiogroup"
				aria-label="Cor de fundo do avatar"
				className="flex flex-wrap items-center gap-2"
			>
				{AVATAR_COLORS.map((cor) => {
					const ativa = cor.key === key;

					return (
						<button
							key={cor.key}
							type="button"
							role="radio"
							aria-checked={ativa}
							aria-label={cor.label}
							title={cor.label}
							onClick={() => setKey(cor.key as AvatarColorKey)}
							className="flex size-11 items-center justify-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-blue-bright/50"
						>
							<span
								className={cn(
									"flex size-8 items-center justify-center rounded-full border transition-transform",
									cor.bg,
									ativa
										? "scale-110 border-blue-deep"
										: "border-line hover:scale-105",
								)}
							>
								{ativa && (
									<Check
										className={cn("size-4", cor.text)}
										aria-hidden="true"
									/>
								)}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
