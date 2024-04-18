import { useState } from "react"
import AuthContext from "./AuthContext"

const TOKEN_KEY_NAME = "token"
const REFRESHTOKEN_KEY_NAME = "refreshtoken"

const AuthProvider = ({children} : {children: JSX.Element}) => {

    const [token,setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY_NAME))
    const [refreshToken,setRefreshtoken] = useState<string | null>(localStorage.getItem(REFRESHTOKEN_KEY_NAME))
    const [isSignedIn,setSignedIn] = useState<boolean>((!token && !refreshToken) ? false : true)

    const signIn = (token: string, refreshToken: string) => {
        setToken(token)
        setRefreshtoken(refreshToken)

        localStorage.setItem(TOKEN_KEY_NAME,token)
        localStorage.setItem(REFRESHTOKEN_KEY_NAME,refreshToken)

        setSignedIn(true)
    }

    const updateToken = (token: string) => {
        setToken(token);

        localStorage.setItem(TOKEN_KEY_NAME,token);

        setSignedIn(true);
    }

    const signOut = () => {
        setToken(null)
        setRefreshtoken(null)

        localStorage.removeItem(TOKEN_KEY_NAME)
        localStorage.removeItem(REFRESHTOKEN_KEY_NAME)

        setSignedIn(false)
    }

    return (
        <AuthContext.Provider value={{
            token: token,
            refreshToken: refreshToken,
            isSignedIn: isSignedIn,
            updateToken: updateToken,
            signIn: signIn,
            signOut: signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;