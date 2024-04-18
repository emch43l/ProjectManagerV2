import { axiosPublic } from "../axios/axios"

const useRefresh = () => {
    return (token: string, refreshToken: string) => axiosPublic.post("auth/refresh",{
        token: token,
        refreshToken: refreshToken
    }).then(response => {
        const token = response.data.token;
        return token;
    }).catch(console.log);
}

export default useRefresh;