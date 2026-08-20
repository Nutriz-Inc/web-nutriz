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
	description?: string;
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

	// Trilha derivada da rota: toda tela interna ganha uma sem precisar
	// declarar nada. Ela convive com o botao "Voltar": a trilha diz onde a
	// pessoa esta, o botao e o caminho rapido de uma tela so.
	const { isAuthenticated } = useAuth();
	const trilha = isAuthenticated ? getBreadcrumb(pathname) : [];
	const temTrilha = trilha.length >= 2;

	const backButton = backTo && (
		<button
			type="button"
			onClick={() => navigate(backTo)}
			className="mb-3 inline-flex w-fit items-center gap-1 rounded-full py-1.5 pl-2 pr-3 text-[13px] font-semibold text-blue-deep transition-colors hover:bg-blue-tint"
		>
			<ChevronLeft className="size-4" />
			Voltar
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
			{temTrilha && <Breadcrumb items={trilha} />}
			{backButton}

			{title && (
				<div className={cn("flex flex-col mb-8", titleClassName)}>
					<div className="flex items-center justify-between mb-2">
						{title && (
							<h1 className="text-2xl font-extrabold text-ink lg:text-4xl">
								{title}
							</h1>
						)}
						{actionSlot}
					</div>
					{description && <p className="text-sm text-ink-3">{description}</p>}
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
