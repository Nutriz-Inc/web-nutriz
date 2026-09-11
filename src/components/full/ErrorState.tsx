import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/error-message";

type ErrorStateProps = {
	error?: unknown;
	onRetry?: () => void;
	className?: string;
};

export function ErrorState({ error, onRetry, className }: ErrorStateProps) {
	return (
		<div
			role="alert"
			className={cn(
				"flex w-full flex-col items-center gap-4 rounded-card-sm border border-danger-tint bg-danger-tint/40 px-6 py-8 text-center",
				className,
			)}
		>
			<p className="max-w-[42ch] text-[14px] leading-relaxed text-ink">
				{getErrorMessage(error)}
			</p>

			{onRetry && (
				<Button type="button" variant="neutral" size="pill" onClick={onRetry}>
					<RotateCw aria-hidden="true" />
					Tentar de novo
				</Button>
			)}
		</div>
	);
}
