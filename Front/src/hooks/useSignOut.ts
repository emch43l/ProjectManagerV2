import { useContext } from "react";
import AuthContext from "../auth/AuthContext";

const useSignOut = () => {
    const context = useContext(AuthContext);
    return () => {
        context.signOut()
    }
}

export default useSignOut;