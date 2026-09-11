import { cn } from "@/lib/utils";

export function Skeleton({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			aria-hidden="true"
			className={cn("esqueleto rounded-card-sm", className)}
			{...props}
		/>
	);
}
