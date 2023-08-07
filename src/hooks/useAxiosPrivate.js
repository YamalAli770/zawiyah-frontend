import axiosPrivate  from "../utils/axiosInstance";
import axios from "axios";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import { useStore } from "../store";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const auth = useStore((state) => state.auth)

    useEffect(() => {
        console.log("useEffect runs");

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']) { // first attempt
                    config.headers['Authorization'] = 'Bearer ' + auth.accessToken;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response, // this is for all successful responses
            async (error) => { // if token expires we handle here
                const prevRequest = error?.config; // get prev request
                console.log("prevRequest", prevRequest);
                if(error?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true; // prevent infinite loop
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = 'Bearer ' + newAccessToken?.accessToken;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [])

    return axiosPrivate;
};

export default useAxiosPrivate;