import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyableIdProps = {
	id: string;
};

export function CopyableId({ id }: CopyableIdProps) {
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(id);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}

	return (
		<button
			type="button"
			onClick={handleCopy}
			className="flex min-w-0 items-center gap-1.5 text-[13px] text-[#9ca3af] transition-colors active:text-[#6b7280]"
		>
			<span className="truncate font-mono">{id}</span>
			{copied ? (
				<Check className="size-3.5 shrink-0 text-[#0e9e94]" />
			) : (
				<Copy className="size-3.5 shrink-0" />
			)}
		</button>
	);
}
