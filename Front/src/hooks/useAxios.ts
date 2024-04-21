import { useContext, useEffect } from "react";
import AuthContext from "../auth/AuthContext";
import { axiosPrivate } from "../axios/axios";
import useRefresh from "./useRefresh";


// https://www.youtube.com/watch?v=nI8PYZNFtac
const useAxios = () => {
    const context = useContext(AuthContext)
    const refreshToken = useRefresh()

    // use effect eject and then assigns new interceptors with updated tokens every component rerender

    useEffect(() => {

        //console.log(context)

        const req = axiosPrivate.interceptors.request.use(request => {

            // add Authorization header to requests

            if(!request.headers["Authorization"]) {
                request.headers["Authorization"] = `Bearer ${context.token}`;
            }
    
            return request;
        }, error => Promise.reject(error))

        const res = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 401 && prevRequest?.sent !== true) {

                    const {token,wasTokenValid} = await refreshToken(context.token!,context.refreshToken!);

                    if(wasTokenValid === false) {
                        context.signOut();
                        return Promise.reject(error);
                    }

                    if(wasTokenValid === true && token !== null) {
                        context.updateToken(token);
    
                        // update authorization header
                        prevRequest.headers["Authorization"] = `Bearer ${token}`
        
                        // tag this request as sent
                        prevRequest.sent = true;
        
                        // return new axios instance with previous request config
                        return axiosPrivate(prevRequest);
                    }
                }

                return Promise.reject(error);   
            }
        )

        return () => {
            //console.log(context)
            axiosPrivate.interceptors.request.eject(req)
            axiosPrivate.interceptors.response.eject(res)
        }
    },[context])    

    return axiosPrivate;
}

export default useAxios;