import { useContext } from "react"
import { axiosPublic } from "../axios/axios"
import AuthContext from "./AuthContext"

const useRefresh = () => {
    const context = useContext(AuthContext);

    return () => axiosPublic.post("auth/refresh",{
        token: context.token,
        refreshToken: context.refreshToken
    }).then(response => {
        const token = response.data.token;
        context.updateToken(token);
        return token;
    }).catch(console.log);
}

export default useRefresh;