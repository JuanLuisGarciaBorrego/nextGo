import axios from "axios";
import {isServerRequest} from "../utils";
import * as queryString from "querystring";
import Router from 'next/router';
import {ROUTE_LOGIN, ROUTE_LOGIN_REDIRECT_SUCCESS} from "../constants/routes";

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
        async editCurrentUser(token, email, name, lastName) {
            let body = {
                'email': email,
                'name': name,
                'lastName': lastName
            };


            configAxios.defaults.headers.Authorization = `Bearer ${token}`

            return await configAxios.put(`/users`, body);
        },
        async changePassword(token, oldPassword, newPassword) {
            let body = {
                'oldPassword': oldPassword,
                'newPassword': newPassword,
            };

            configAxios.defaults.headers.Authorization = `Bearer ${token}`

            return await configAxios.put(`/users/change-password`, body);
        },
        async list(token, page = 1, parameters = []) {
            configAxios.defaults.headers.Authorization = `Bearer ${token}`
            parameters['page'] =  page ? page : 1;
            const query = queryString.stringify(parameters);
            return await configAxios.get(`/users?${query}`);
        },
        async show(token, uuid) {
            configAxios.defaults.headers.Authorization = `Bearer ${token}`

            return await configAxios.get(`/users/${uuid}`);
        },
        async add(token, email, name, lastName, password, role, isActive, sendEmail) {
            let body = {
                'email': email,
                'name': name,
                'lastName': lastName,
                'password': password,
                'role': role,
                'isActive': isActive,
                'sendEmail': sendEmail
            };

            configAxios.defaults.headers.Authorization = `Bearer ${token}`

            return await configAxios.post(`/users`, body);
        },
        async edit(token, uuid, email, name, lastName, password, role, isActive, sendEmail) {
            let body = {
                'email': email,
                'name': name,
                'lastName': lastName,
                'password': password,
                'role': role,
                'isActive': isActive,
                'sendEmail': sendEmail
            };

            configAxios.defaults.headers.Authorization = `Bearer ${token}`

            return await configAxios.put(`/users/${uuid}`, body);
        }
    }
}
export default API;

configAxios.interceptors.response.use(function (config) {
    return config;
}, function (error) {
    if(error.response.status === 401) {
        window.location.reload();
    }
    return Promise.reject(error);
});

