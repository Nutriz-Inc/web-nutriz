/* eslint-disable react-refresh/only-export-components */
import {
	type PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from "react";

import { setApiToken } from "../services";
import type { IAuthResponse } from "../services/types/i-auth";

export const CONTEXT_KEY = "data";

type IAuthContext = {
	auth: IAuthResponse | null;
	updateAuth: (data: IAuthResponse) => void;
	handleLogout: () => void;
};

export const AuthContext = createContext<IAuthContext>({
	auth: null,
	updateAuth: () => {},
	handleLogout: () => {},
});

type IAuthProvider = PropsWithChildren;

export function AuthProvider({ children }: IAuthProvider) {
	const [auth, setAuth] = useState<IAuthResponse | null>(() => {
		const stored = localStorage.getItem(CONTEXT_KEY);

		if (!stored) {
			return null;
		}

		const data = JSON.parse(stored) as IAuthResponse;

		if (data?.token) {
			setApiToken(data.token);
		}

		return data;
	});

	useEffect(() => {
		if (auth?.token) {
			setApiToken(auth.token);
		}
	}, [auth]);

	function updateAuth(data: IAuthResponse) {
		setAuth(data);

		localStorage.setItem(CONTEXT_KEY, JSON.stringify(data));
	}

	function handleLogout() {
		setAuth(null);

		localStorage.removeItem(CONTEXT_KEY);

		setApiToken("");
	}

	return (
		<AuthContext.Provider
			value={{
				auth,
				updateAuth,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
