import { useState } from "react"
import AuthContext from "./AuthContext"
import { axiosPublic } from "../axios/axios"

const TOKEN_KEY_NAME = "token"
const REFRESHTOKEN_KEY_NAME = "refreshtoken"
const USER_KEY_NAME = "user"

const AuthProvider = ({children} : {children: JSX.Element}) => {

    const getUserFromLocalStorage = () : User | null => {
        
        const jsonString: string | null = localStorage.getItem(USER_KEY_NAME)
        if(jsonString == null)
            return null;
        return JSON.parse(jsonString);
    }

    const [user,setUser] = useState<User | null>(getUserFromLocalStorage());
    const [token,setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY_NAME))
    const [refreshToken,setRefreshtoken] = useState<string | null>(localStorage.getItem(REFRESHTOKEN_KEY_NAME))
    const [isSignedIn,setSignedIn] = useState<boolean>((!token && !refreshToken) ? false : true)

    const updateUser = (token: string) => {
        axiosPublic.get<User>("auth/user",{
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }).then(response => {
            localStorage.setItem(USER_KEY_NAME,JSON.stringify(response.data))
            setUser(response.data)
        }).catch(console.log)
    }

    const signIn = (token: string, refreshToken: string) => {
        setToken(token)
        setRefreshtoken(refreshToken)
        updateUser(token)

        localStorage.setItem(TOKEN_KEY_NAME,token)
        localStorage.setItem(REFRESHTOKEN_KEY_NAME,refreshToken)

        setSignedIn(true)
    }

    const updateToken = (token: string) => {
        setToken(token);
        updateUser(token);

        localStorage.setItem(TOKEN_KEY_NAME,token);

        setSignedIn(true);
    }

    const signOut = () => {
        setToken(null)
        setRefreshtoken(null)

        localStorage.removeItem(TOKEN_KEY_NAME)
        localStorage.removeItem(REFRESHTOKEN_KEY_NAME)
        localStorage.removeItem(USER_KEY_NAME)

        setSignedIn(false)
    }

    return (
        <AuthContext.Provider value={{
            user: user,
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