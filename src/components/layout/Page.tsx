import { AlertCircle, LoaderCircle, icons } from "lucide-react";
import React from "react";
import { Link, type LinkProps } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button, type ButtonProps, buttonVariants } from "../ui/button";

export type ActionItem = {
	label: string;
	icon: keyof typeof icons;
	testid?: string;
	variant?: ButtonProps["variant"];
} & ({ onAction: () => void } | Pick<LinkProps, "to">);

export type IPage = {
	children: React.ReactNode;
	title?: string;
	action?: ActionItem | ActionItem[];
	actionSlot?: React.ReactNode;
	loading?: boolean;
	hasPermission?: boolean;
};

export function Page({
	children,
	title,
	loading,
	action,
	actionSlot,
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
				<div className="flex flex-col mb-4">
					<div className="flex items-center justify-between">
						{title && (
							<h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
						)}
						{actionSlot ? (
							actionSlot
						) : action ? (
							<RenderActions action={action} />
						) : null}
					</div>
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

const RenderActions = ({ action }: { action?: ActionItem | ActionItem[] }) => {
	if (!action) {
		return null;
	}

	const actionsArray = Array.isArray(action) ? action : [action];

	if (actionsArray.length === 0) {
		return null;
	}

	return (
		<div className="flex items-center gap-2">
			{actionsArray.map((singleAction, index) => {
				const Icon = icons[singleAction.icon as keyof typeof icons];
				const content = (
					<>
						<Icon size={12} />
						<span className="ml-2">{singleAction.label}</span>
					</>
				);
				const key = `action-${index}-${singleAction.label}`;

				if ("to" in singleAction) {
					return (
						<Link
							key={key}
							data-testid={singleAction.testid}
							className={cn(
								buttonVariants({ variant: "outline" }),
								"max-h-[28px] py-1 px-2",
							)}
							to={singleAction.to}
						>
							{content}
						</Link>
					);
				}

				return (
					<Button
						key={key}
						data-testid={singleAction.testid}
						onClick={singleAction.onAction}
						variant={singleAction?.variant || "outline"}
						className="max-h-[28px] py-1 px-2"
					>
						{content}
					</Button>
				);
			})}
		</div>
	);
};
