import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AcoesDoSheetProps = {
	children: ReactNode;
	className?: string;
};

export function AcoesDoSheet({ children, className }: AcoesDoSheetProps) {
	return (
		<div
			className={cn(
				"flex shrink-0 flex-col-reverse gap-2.5 sm:grid sm:grid-cols-2 sm:gap-3 [&>*]:w-full [&>*]:min-w-0",
				className,
			)}
		>
			{children}
		</div>
	);
}
