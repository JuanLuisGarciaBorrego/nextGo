import axios from "axios";

export const serverBaseURL = '/api';

const configAxios = axios.create({
    baseURL: serverBaseURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const SERVER_API = {
    security: {
        async checkAuth() {
            return await configAxios.get(`/checkAuth`);
        },
        async login(email, password) {
            let body = {
                'email': email,
                'password': password
            };

            return await configAxios.post(`/login`, body);
        },
        async logout() {
            return await configAxios.get(`/logout`);
        },
        async refresh(newToken, newRefreshToken) {
            let body = {
                'token': newToken,
                'refresh_token': newRefreshToken
            };

            return await configAxios.post(`/refresh`, body);
        },
    }
};

export default SERVER_API;
