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
        async init() {
            return await configAxios.get(`/init`);
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
    }
};

export default SERVER_API;
