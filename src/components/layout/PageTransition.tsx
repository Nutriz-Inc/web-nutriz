import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

export function PageTransition() {
	const { pathname } = useLocation();
	const semMovimento = useReducedMotion();
	const primeiraRota = useRef(pathname);

	useEffect(() => {
		if (primeiraRota.current !== pathname) {
			primeiraRota.current = "";
		}
	}, [pathname]);

	if (semMovimento) {
		return <Outlet />;
	}

	return (
		<motion.div
			key={pathname}
			initial={primeiraRota.current === pathname ? false : { opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.18, ease: "easeOut" }}
		>
			<Outlet />
		</motion.div>
	);
}
