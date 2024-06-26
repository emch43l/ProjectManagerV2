import { createContext } from "react";
import { User } from "../type/User";

const AuthContext = createContext<Auth>({
    isSignedIn: false,
    token: null,
    refreshToken: null,
    user: null,
    updateToken: (token: string) => {},
    signIn: (token: string, refreshToken: string) => {},
    signOut: () => {}
});

export type Auth = {
    isSignedIn: boolean,
    token: string | null,
    refreshToken: string | null,
    user: User | null,
    updateToken: (token: string) => void,
    signIn: (token: string,refreshToken: string) => void
    signOut: () => void
}

export default AuthContext;