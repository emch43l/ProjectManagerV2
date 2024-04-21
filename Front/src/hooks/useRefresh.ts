import { axiosPublic } from "../axios/axios"

export type RefreshResultType = {
    token: string | null,
    wasTokenValid: boolean | null
}

const useRefresh = () : (token: string, refreshToken: string) => Promise<RefreshResultType> => {
    
    return (token: string, refreshToken: string) => axiosPublic.post<RefreshResultType>("auth/refresh",{
        token: token,
        refreshToken: refreshToken
    }).then(response => {
        return { 
            token: response.data.token, 
            wasTokenValid: true
        }
    }).catch(e => {
        if(e.response.status === 401) {
            return {
                token: null
                ,wasTokenValid: false
            }
        } else {
            return {
                token: null
                ,wasTokenValid: false
            }
        }
    });
}

export default useRefresh;