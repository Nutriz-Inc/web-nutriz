import { AlertCircle, ChevronLeft, LoaderCircle } from "lucide-react";
import type React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb } from "@/components/full/Breadcrumb";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { getBreadcrumb } from "@/utils/breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export type IPage = {
	children: React.ReactNode;
	title?: string;
	description?: React.ReactNode;
	actionSlot?: React.ReactNode;
	loading?: boolean;
	hasPermission?: boolean;
	titleClassName?: string;
	backTo?: string;
};

export function Page({
	children,
	title,
	description,
	actionSlot,
	loading,
	hasPermission = true,
	titleClassName,
	backTo,
}: IPage) {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const { auth, isAuthenticated } = useAuth();
	const trilha = isAuthenticated ? getBreadcrumb(pathname, auth?.type) : [];
	const temTrilha = trilha.length >= 2;

	const backButton = backTo && (
		<button
			type="button"
			onClick={() => navigate(backTo)}
			aria-label={temTrilha ? "Voltar" : undefined}
			className={cn(
				"inline-flex shrink-0 items-center justify-center text-blue-deep outline-none transition-colors hover:bg-blue-tint focus-visible:ring-3 focus-visible:ring-blue-bright/50",
				temTrilha
					? "size-8 rounded-full border border-line bg-surface"
					: "w-fit gap-1 rounded-full py-1.5 pl-2 pr-3 text-[13px] font-semibold",
			)}
		>
			<ChevronLeft className={temTrilha ? "size-[18px]" : "size-4"} />
			{!temTrilha && "Voltar"}
		</button>
	);

	if (!hasPermission) {
		return (
			<div className="flex w-full flex-col items-center gap-3">
				{backButton}
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
			{(temTrilha || backTo) && (
				<div
					className={cn(
						"mb-5 flex flex-wrap items-center gap-x-3 gap-y-2",
						titleClassName,
					)}
				>
					{backButton}
					{temTrilha && <Breadcrumb items={trilha} className="mb-0 min-w-0" />}
				</div>
			)}

			{title && (
				<div className={cn("mb-8 flex flex-col gap-2", titleClassName)}>
					<div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
						<h1 className="font-display text-[1.625rem] font-extrabold leading-tight tracking-tight text-blue-deep lg:text-4xl">
							{title}
						</h1>
						{actionSlot}
					</div>
					{description && (
						<div className="text-sm text-ink-2 lg:text-[15px]">
							{description}
						</div>
					)}
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
