import { AlertCircle, LoaderCircle } from "lucide-react";
import type React from "react";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export type IPage = {
	children: React.ReactNode;
	title?: string;
	description?: string;
	actionSlot?: React.ReactNode;
	loading?: boolean;
	hasPermission?: boolean;
};

export function Page({
	children,
	title,
	description,
	actionSlot,
	loading,
	hasPermission = true,
}: IPage) {
	if (!hasPermission) {
		return (
			<div className="flex w-full justify-center">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Atenção</AlertTitle>
					<AlertDescription>
						Você não possui permissão para entrar nessa página
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	return (
		<>
			{title && (
				<div className="flex flex-col mb-8">
					<div className="flex items-center justify-between mb-2">
						{title && (
							<h1 className="text-2xl font-extrabold text-[#0e2a45] lg:text-4xl">
								{title}
							</h1>
						)}
						{actionSlot}
					</div>
					{description && <p className="text-sm text-[#888]">{description}</p>}
				</div>
			)}

			{loading ? (
				<div className="flex w-full justify-center pt-8">
					<LoaderCircle
						data-testid="loader-page"
						className="animate-spin text-muted-foreground"
					/>
				</div>
			) : (
				children
			)}
		</>
	);
}
