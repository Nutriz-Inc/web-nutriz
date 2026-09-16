import { useThemeColor } from "@/hooks/use-theme-color";

type ThemeColorSyncProps = {
	isAuthenticated: boolean;
};

export function ThemeColorSync({ isAuthenticated }: ThemeColorSyncProps) {
	useThemeColor(isAuthenticated);
	return null;
}
