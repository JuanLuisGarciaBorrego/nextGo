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

            return await configAxios.get(`${BASE_URL}/init`);
        },
        async login(email, password) {
            let body = {
                'email': email,
                'password': password
            };

            return await configAxios.post(`/login_check`, body);
        },
        async refresh(refreshToken) {
            let body = {'refresh_token': refreshToken};

            return await configAxios.post(`/token/refresh`, body);
        },
        async recoveryPassword(email) {
            let body = {'email': email};

            return await configAxios.post(`/recovery-password`, body);
        },
        async changePasswordFromRecovery(code, password) {
            let body = {
                'confirmationToken': code,
                'plainPassword': password
            };

            return await configAxios.put(`/recovery-password`, body);
        }
    }
}
export default API;
