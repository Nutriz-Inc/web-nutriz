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
import { jaViuBoasVindas, marcarBoasVindasVistas } from "./eva-boas-vindas";
import { EvaFab } from "./eva-fab";
import { EvaModalConteudo, type EvaVisao } from "./eva-modal-conteudo";
import {
	getAppMenuOpen,
	subscribeAppMenuOpen,
	subscribeEvaOpen,
} from "./eva-widget-bus";
import "./eva-widget.css";
import { useEvaAccess } from "./use-eva-access";

const HIDDEN_ROUTES = new Set(["/login", "/registro"]);

export function EvaWidget() {
	const { allowed, mode, userId } = useEvaAccess();
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
	const [visaoInicial, setVisaoInicial] = useState<EvaVisao>("welcome");
	const [initialMessage, setInitialMessage] = useState<string | undefined>(
		undefined,
	);
	const [aberturas, setAberturas] = useState(0);

	const handleOpenChange = useCallback(
		(next: boolean) => {
			if (next) {
				const skipWelcome = lembraDasBoasVindas && jaViuBoasVindas(userId);
				setInitialMessage(undefined);
				setVisaoInicial(skipWelcome ? "chat" : "welcome");
				setAberturas((total) => total + 1);
			}

			setOpen(next);
		},
		[lembraDasBoasVindas, userId],
	);

	useEffect(() => {
		return subscribeEvaOpen((message?: string) => {
			const skipWelcome =
				lembraDasBoasVindas && (jaViuBoasVindas(userId) || Boolean(message));

			if (skipWelcome) {
				marcarBoasVindasVistas(userId);
			}

			setInitialMessage(message);
			setVisaoInicial(skipWelcome ? "chat" : "welcome");
			setAberturas((total) => total + 1);
			setOpen(true);
		});
	}, [lembraDasBoasVindas, userId]);

	if (!allowed || HIDDEN_ROUTES.has(pathname)) {
		return null;
	}

	const fabObstruido = open || menuOpen;

	const modalMotion = reduce
		? {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: 0.15 },
			}
		: {
				initial: { opacity: 0, scale: 0.6, y: 16 },
				animate: {
					opacity: 1,
					scale: 1,
					y: 0,
					transition: {
						type: "spring" as const,
						bounce: 0.14,
						visualDuration: 0.42,
						opacity: { duration: 0.22, ease: "easeOut" as const },
					},
				},
				exit: {
					opacity: 0,
					scale: 0.7,
					y: 12,
					transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as const },
				},
			};

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<EvaFab
				botaoRef={fabRef}
				tom={tomDoFundo}
				oculto={fabObstruido}
				aberto={open}
				aoAbrir={() => handleOpenChange(true)}
			/>

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
						<Dialog.Content
							asChild
							forceMount
							aria-describedby={undefined}
							onCloseAutoFocus={(evento) => {
								evento.preventDefault();
								fabRef.current?.focus({ preventScroll: true });
							}}
						>
							<motion.div
								className="eva-widget-modal"
								style={{ transformOrigin: "bottom right" }}
								{...modalMotion}
							>
								<EvaModalConteudo
									key={aberturas}
									mode={mode}
									userId={userId}
									visaoInicial={visaoInicial}
									mensagemInicial={initialMessage}
									onFechar={() => setOpen(false)}
								/>
							</motion.div>
						</Dialog.Content>
					</Dialog.Portal>
				) : null}
			</AnimatePresence>
		</Dialog.Root>
	);
}
