import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";
import { axiosPrivate } from "./axios";
import useRefresh from "../auth/useRefresh";

const useAxios = () => {
    const context = useContext(AuthContext)
    const refreshToken = useRefresh()

    useEffect(() => {
        const req = axiosPrivate.interceptors.request.use(request => {

            if(!request.headers["Authorization"]) {
                request.headers["Authorization"] = `Bearer ${context.token}`;
            }
    
            return request;
        })
        const res = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 401 && prevRequest?.sent !== true) {
                    const token = await refreshToken();
                    prevRequest.headers["Authorization"] = `Bearer ${token}`
                    prevRequest.sent = true;
                    await axiosPrivate(prevRequest);
                }
                
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(req)
            axiosPrivate.interceptors.response.eject(res)
        }
    },[context])

    

    return axiosPrivate;
}

export default useAxios;