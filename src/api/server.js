import axios from "axios";

export const serverBaseURL = '/api';

const SERVER_API = {
    security: {
        async login(email, password) {
            let body = {
                'email': email,
                'password': password
            };

            return await axios.post(`${serverBaseURL}/login`, body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        },
        async logout() {
            return await axios.get(`${serverBaseURL}/logout`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        },
    }
};

export default SERVER_API;
