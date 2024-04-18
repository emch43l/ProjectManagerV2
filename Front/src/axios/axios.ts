import axios from "axios";
import { endpointUrl as baseURL } from "../../config.json";

export const axiosPrivate = axios.create({
    headers: {
        "Content-Type" : "application/json",
    },
    baseURL: baseURL,
});

export const axiosPublic = axios.create({
    baseURL: baseURL,
});
