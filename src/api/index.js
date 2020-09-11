import axios from "axios";
import {isServerRequest} from "../utils";
import {ROUTE_LOGIN} from "../constants/routes";

const BASE_URL = isServerRequest ? process.env.API_BASE_URL : process.env.NEXT_PUBLIC_API_BASE_URL;

const configAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const configSecurityAxios = axios.create({
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
                configSecurityAxios.defaults.headers.Authorization = `Bearer ${token}`
            }

            return await configSecurityAxios.get(`/init`);
        },
        async login(email, password) {
            let body = {
                'email': email,
                'password': password
            };

            return await configSecurityAxios.post(`/login_check`, body);
        },
        async refresh(refreshToken) {
            let body = {'refresh_token': refreshToken};

            return await configSecurityAxios.post(`/token/refresh`, body);
        },
        async recoveryPassword(email) {
            let body = {'email': email};

            return await configSecurityAxios.post(`/recovery-password`, body);
        },
        async changePasswordFromRecovery(code, password) {
            let body = {
                'confirmationToken': code,
                'plainPassword': password
            };

            return await configSecurityAxios.put(`/recovery-password`, body);
        }
    },
    user: {
        async currentUser(token) {
            configAxios.defaults.headers.Authorization = `Bearer ${token}`

            return await configAxios.get(`/userAuthenticated`);
        },
    }
}
export default API;

configAxios.interceptors.response.use(function (config) {
    return config;
}, function (error) {
    if (error.response.status === 401) {
        return window.location.replace(ROUTE_LOGIN);
    }
    return Promise.reject(error);
});

