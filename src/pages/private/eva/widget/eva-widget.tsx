import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dialog } from "radix-ui";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	useSyncExternalStore,
} from "react";
import { useBackdropTone } from "@/hooks/use-backdrop-tone";
import { getAppPathname, subscribeAppPath } from "@/lib/app-navigation";
import { EvaChatPanel } from "./eva-chat-panel";
import { EvaWelcomePanel } from "./eva-welcome-panel";
import {
	getAppMenuOpen,
	subscribeAppMenuOpen,
	subscribeEvaOpen,
} from "./eva-widget-bus";
import "./eva-widget.css";
import { EVA_PERSONAS } from "../constants";
import { EvaHelpPanel } from "./eva-help-panel";
import { useEvaAccess } from "./use-eva-access";

const HIDDEN_ROUTES = new Set(["/login", "/registro"]);

type WidgetView = "welcome" | "chat" | "ajuda";

function CloseButton() {
	return (
		<Dialog.Close asChild>
			<button
				type="button"
				className="eva-widget-close"
				aria-label="Fechar chat"
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 20 20"
					fill="none"
					role="img"
					aria-hidden="true"
				>
					<title>Fechar</title>
					<path
						d="M5 5l10 10M15 5L5 15"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
					/>
				</svg>
			</button>
		</Dialog.Close>
	);
}

function welcomeSeenKey(userId: string) {
	return `eva:welcome-seen:${userId}`;
}

function hasSeenWelcome(userId: string | null) {
	if (!userId) {
		return false;
	}

	try {
		return localStorage.getItem(welcomeSeenKey(userId)) === "1";
	} catch {
		return false;
	}
}

function markWelcomeSeen(userId: string | null) {
	if (!userId) {
		return;
	}

	try {
		localStorage.setItem(welcomeSeenKey(userId), "1");
	} catch {}
}

export function EvaWidget() {
	const { allowed, mode, userId } = useEvaAccess();
	const rotuloDoModo = EVA_PERSONAS[mode].rotuloDoModo;
	const lembraDasBoasVindas = mode !== "anonymous";
	const pathname = useSyncExternalStore(
		subscribeAppPath,
		getAppPathname,
		getAppPathname,
	);
	const menuOpen = useSyncExternalStore(
		subscribeAppMenuOpen,
		getAppMenuOpen,
		getAppMenuOpen,
	);
	const reduce = useReducedMotion();

	const [open, setOpen] = useState(false);

	const fabRef = useRef<HTMLButtonElement>(null);
	const tomDoFundo = useBackdropTone(fabRef, !open);
	const [view, setView] = useState<WidgetView>("welcome");
	const [viewAnterior, setViewAnterior] = useState<WidgetView>("welcome");

	function abrirAjuda() {
		setViewAnterior(view === "ajuda" ? "welcome" : view);
		setView("ajuda");
	}
	const [initialMessage, setInitialMessage] = useState<string | undefined>(
		undefined,
	);

	const startChat = useCallback(
		(message?: string) => {
			if (lembraDasBoasVindas) {
				markWelcomeSeen(userId);
			}

			setInitialMessage((previous) => message ?? previous);
			setView("chat");
		},
		[lembraDasBoasVindas, userId],
	);

	const handleOpenChange = useCallback(
		(next: boolean) => {
			if (next) {
				const skipWelcome = lembraDasBoasVindas && hasSeenWelcome(userId);
				setInitialMessage(undefined);
				setView(skipWelcome ? "chat" : "welcome");
			}

			setOpen(next);
		},
		[lembraDasBoasVindas, userId],
	);

	useEffect(() => {
		return subscribeEvaOpen((message?: string) => {
			const skipWelcome =
				lembraDasBoasVindas && (hasSeenWelcome(userId) || Boolean(message));

			if (skipWelcome) {
				markWelcomeSeen(userId);
			}

			setInitialMessage(message);
			setView(skipWelcome ? "chat" : "welcome");
			setOpen(true);
		});
	}, [lembraDasBoasVindas, userId]);

	if (!allowed || HIDDEN_ROUTES.has(pathname)) {
		return null;
	}

	const fabObstruido = !open && menuOpen;

	const modalMotion = reduce
		? {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: 0.15 },
			}
		: {
				initial: { opacity: 0, scale: 0.8 },
				animate: {
					opacity: 1,
					scale: 1,
					transition: { type: "spring" as const, stiffness: 260, damping: 18 },
				},
				exit: {
					opacity: 0,
					scale: 0.85,
					transition: { duration: 0.18, ease: "easeIn" as const },
				},
			};

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<Dialog.Trigger asChild>
				<button
					ref={fabRef}
					type="button"
					className={fabObstruido ? "eva-fab eva-fab--oculto" : "eva-fab"}
					data-fundo={tomDoFundo}
					aria-label="Abrir chat com a EVA"
				>
					<span className="eva-fab-mark" aria-hidden="true">
						<span className="eva-fab-mark-cor eva-fab-mark-cor--forte" />
						<span className="eva-fab-mark-cor eva-fab-mark-cor--clara" />
					</span>
				</button>
			</Dialog.Trigger>

			<AnimatePresence>
				{open ? (
					<Dialog.Portal forceMount key="eva-portal">
						<Dialog.Overlay asChild forceMount>
							<motion.div
								className="eva-widget-overlay"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							/>
						</Dialog.Overlay>
						<Dialog.Content asChild forceMount aria-describedby={undefined}>
							<motion.div
								className="eva-widget-modal"
								style={{ transformOrigin: "bottom right" }}
								{...modalMotion}
							>
								{view === "ajuda" ? null : view === "welcome" ? (
									<div className="eva-widget-header eva-widget-header--bare">
										<button
											type="button"
											className="eva-widget-ajuda"
											onClick={abrirAjuda}
											aria-label="Como usar a EVA"
										>
											?
										</button>
										<CloseButton />
										<Dialog.Title className="sr-only">
											Assistente EVA
										</Dialog.Title>
									</div>
								) : (
									<div className="eva-widget-header eva-widget-header--chat">
										<span className="eva-widget-header-spacer" aria-hidden />
										<Dialog.Title className="eva-widget-header-title">
											EVA
											{rotuloDoModo ? (
												<span className="eva-widget-modo">{rotuloDoModo}</span>
											) : null}
										</Dialog.Title>
										<button
											type="button"
											className="eva-widget-ajuda"
											onClick={abrirAjuda}
											aria-label="Como usar a EVA"
										>
											?
										</button>
										<CloseButton />
									</div>
								)}

								{view === "ajuda" ? (
									<>
										<Dialog.Title className="sr-only">
											Como usar a EVA
										</Dialog.Title>
										<EvaHelpPanel
											mode={mode}
											onBack={() => setView(viewAnterior)}
										/>
									</>
								) : view === "welcome" ? (
									<EvaWelcomePanel mode={mode} onStart={startChat} />
								) : (
									<EvaChatPanel
										initialMessage={initialMessage}
										onClose={() => setOpen(false)}
									/>
								)}
							</motion.div>
						</Dialog.Content>
					</Dialog.Portal>
				) : null}
			</AnimatePresence>
		</Dialog.Root>
	);
}
