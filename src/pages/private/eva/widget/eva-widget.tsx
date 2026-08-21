import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dialog } from "radix-ui";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { getAppPathname, subscribeAppPath } from "@/lib/app-navigation";
import { AvatarEva } from "../components/avatar-eva";
import { EvaIcon } from "../components/eva-icon";
import { EvaChatPanel } from "./eva-chat-panel";
import { EvaWelcomePanel } from "./eva-welcome-panel";
import {
	getAppMenuOpen,
	subscribeAppMenuOpen,
	subscribeEvaOpen,
} from "./eva-widget-bus";
import "./eva-widget.css";
import { useEvaAccess } from "./use-eva-access";

// Rotas onde o widget da EVA nao deve aparecer (foco no formulario).
const HIDDEN_ROUTES = new Set(["/login", "/registro"]);

type WidgetView = "welcome" | "chat";

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
	} catch {
		// localStorage indisponivel: sem persistir a flag, a nutriz apenas
		// vera a boas-vindas de novo. Nao e critico.
	}
}

export function EvaWidget() {
	const { allowed, mode, userId } = useEvaAccess();
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
	const [view, setView] = useState<WidgetView>("welcome");
	const [initialMessage, setInitialMessage] = useState<string | undefined>(
		undefined,
	);

	const startChat = useCallback(
		(message?: string) => {
			if (mode === "nutriz") {
				markWelcomeSeen(userId);
			}

			// Sem mensagem nova, preserva a que veio de um CTA (openEva) e ficou
			// aguardando a ciencia do aviso LGPD na tela de boas-vindas.
			setInitialMessage((previous) => message ?? previous);
			setView("chat");
		},
		[mode, userId],
	);

	const handleOpenChange = useCallback(
		(next: boolean) => {
			if (next) {
				// Ao abrir: anonimo ve boas-vindas toda vez (cada visita e uma nova
				// sessao); nutriz so na primeira vez (flag por id_user).
				const skipWelcome = mode === "nutriz" && hasSeenWelcome(userId);
				setInitialMessage(undefined);
				setView(skipWelcome ? "chat" : "welcome");
			}

			setOpen(next);
		},
		[mode, userId],
	);

	// CTAs "Falar com a EVA" (landing/home) abrem o widget via bus, ja que
	// vivem dentro do RouterProvider e o widget fora dele.
	useEffect(() => {
		return subscribeEvaOpen((message?: string) => {
			// Anonimo SEMPRE passa pela boas-vindas (e o aviso LGPD e bloqueante);
			// nutriz pula direto para o chat se ja viu a boas-vindas ou se o CTA
			// trouxe uma mensagem para enviar.
			const skipWelcome =
				mode === "nutriz" && (hasSeenWelcome(userId) || Boolean(message));

			if (skipWelcome && mode === "nutriz") {
				markWelcomeSeen(userId);
			}

			setInitialMessage(message);
			setView(skipWelcome ? "chat" : "welcome");
			setOpen(true);
		});
	}, [mode, userId]);

	if (!allowed || HIDDEN_ROUTES.has(pathname)) {
		return null;
	}

	// Algo aberto por cima do canto do FAB (menu lateral, bottom sheet,
	// dialogo). Ele some enquanto durar — ver eva-widget-bus.ts. So vale com a
	// EVA fechada: com ela aberta, quem esta por cima e o proprio modal.
	const fabObstruido = !open && menuOpen;

	// Abrir/fechar: a janela nasce no canto do FAB e cresce em diagonal ate o
	// lugar, com uma mola macia — nada de salto. Ao fechar ela recolhe na
	// direcao de onde veio, mais rapido do que abriu, que e como um painel
	// dispensado se comporta. Publico e nutriz no pos-parto, muitas vezes de
	// madrugada: acolhedor, nao saltitante.
	const modalMotion = reduce
		? {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: 0.15 },
			}
		: {
				initial: { opacity: 0, scale: 0.86, y: 26, x: 12 },
				animate: {
					opacity: 1,
					scale: 1,
					y: 0,
					x: 0,
					transition: {
						type: "spring" as const,
						stiffness: 210,
						damping: 24,
						mass: 0.9,
					},
				},
				exit: {
					opacity: 0,
					scale: 0.9,
					y: 18,
					x: 8,
					transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const },
				},
			};

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<Dialog.Trigger asChild>
				<button
					type="button"
					className={fabObstruido ? "eva-fab eva-fab--oculto" : "eva-fab"}
					aria-label="Abrir chat com a EVA"
				>
					{/* O FAB era um circulo vazio: nao havia icone nenhum dentro. */}
					<EvaIcon size={28} />
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
								{view === "welcome" ? (
									<div className="eva-widget-header eva-widget-header--welcome">
										<CloseButton />
										<Dialog.Title className="eva-widget-header-title">
											Assistente EVA
										</Dialog.Title>
										<span className="eva-widget-header-spacer" aria-hidden />
									</div>
								) : (
									<div className="eva-widget-header eva-widget-header--chat">
										<div className="eva-widget-header-id">
											<AvatarEva size={38} />
											<div className="eva-widget-header-info">
												<Dialog.Title className="eva-widget-header-title">
													EVA
												</Dialog.Title>
												<span className="eva-widget-header-status">
													<span className="eva-widget-status-dot" aria-hidden />
													online
												</span>
											</div>
										</div>
										<CloseButton />
									</div>
								)}

								{view === "welcome" ? (
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
