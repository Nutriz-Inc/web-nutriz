import { useEffect, useState } from "react";

const QUERY = "(min-width: 1024px)";

export function useIsDesktop() {
	const [isDesktop, setIsDesktop] = useState(
		() => window.matchMedia(QUERY).matches,
	);

	useEffect(() => {
		const media = window.matchMedia(QUERY);

		function handleChange(event: MediaQueryListEvent) {
			setIsDesktop(event.matches);
		}

		media.addEventListener("change", handleChange);

		return () => media.removeEventListener("change", handleChange);
	}, []);

	return isDesktop;
}
