import { Pencil } from "lucide-react";
import type { ReactNode } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	AVATAR_COLORS,
	type AvatarColorKey,
	useAvatarColor,
} from "@/hooks/use-avatar-color";
import { cn } from "@/lib/utils";

type AvatarColorPickerProps = {
	idUser: string | undefined;
	children: ReactNode;
	className?: string;
};

export function AvatarColorPicker({
	idUser,
	children,
	className,
}: AvatarColorPickerProps) {
	const { key, setKey } = useAvatarColor(idUser);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					aria-label="Alterar a cor do avatar"
					className={cn(
						"group relative rounded-full outline-none focus-visible:ring-3 focus-visible:ring-blue-bright/50",
						className,
					)}
				>
					{children}

					<span
						aria-hidden="true"
						className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full border border-line bg-surface text-ink-2 shadow-soft transition-colors group-hover:bg-blue-tint group-hover:text-blue-deep"
					>
						<Pencil className="size-3.5" />
					</span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start" className="min-w-0 p-2">
				<p className="px-1 pb-2 text-[12px] font-semibold text-ink-2">
					Cor do avatar
				</p>

				<div
					role="radiogroup"
					aria-label="Cor de fundo do avatar"
					className="grid grid-cols-4 gap-1"
				>
					{AVATAR_COLORS.map((cor) => {
						const ativa = cor.key === key;

						return (
							// biome-ignore lint/a11y/useSemanticElements: o alvo e um
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
										"size-8 rounded-full border-2 transition-transform",
										cor.bg,
										ativa
											? "scale-110 border-blue-deep"
											: "border-transparent hover:scale-105",
									)}
								/>
							</button>
						);
					})}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
