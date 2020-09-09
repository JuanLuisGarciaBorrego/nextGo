import axios from "axios";
import {generateQueryStringFromObject, isServerRequest, redirectBrowser} from "../utils";

const BASE_URL = isServerRequest ? process.env.API_BASE_URL : process.env.NEXT_PUBLIC_API_BASE_URL;

const configAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const API = {
    security: {
        async init(token = null) {
            if (token) {
                configAxios.defaults.headers.Authorization = `Bearer ${token}`
            }

            return await axios.get(`${BASE_URL}/init`);
        }
    }
}
