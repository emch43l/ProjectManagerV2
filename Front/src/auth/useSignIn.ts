import { useContext } from "react";
import AuthContext from "./AuthContext";

const useSignIn = () => {
    const context = useContext(AuthContext);
    
    return (token: string, refreshToken: string) => {
        context.signIn(token,refreshToken)
    }
}

export default useSignIn;