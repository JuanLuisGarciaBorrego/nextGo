import React, {useState, useEffect, createContext, useContext} from 'react';
import SERVER_API from "../api/server";
import {useRouter} from 'next/router'
import {whatRoleAmI} from "../utils";
import API from "../api";
import {ROUTE_LOGIN} from "../constants/routes";

export const AuthContext = createContext({
    isAuthenticated: false,
    setAuthenticated: () => {
    },
    user: null,
    role: null
});

const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setLoading] = React.useState(true);

    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const initializedAuth = async () => {
            const response = await SERVER_API.security.checkAuth();

            if (!response.data.hasCookies) {
                setAuthenticated(false)
                setLoading(false);
                return;
            }

            try {
                const responseApi = await API.security.init(response.data.cookies.auth)

                setToken(response.data.cookies.auth);
                setRefreshToken(response.data.cookies.refresh);

                setAuthenticated(responseApi.data.data.isAuthenticated);
                setLoading(false);
                setRole(whatRoleAmI(responseApi.data.data.user.roles));
                setUser(responseApi.data.data.user);

                return;
            } catch (e) {
                if (e.response?.status === 401) {
                    try {
                        const responseRefreshTokenApi = await API.security.refresh(response.data.cookies.refresh);

                        const responseInitApiRefresh = await API.security.init(responseRefreshTokenApi.data.token);

                        setToken(responseRefreshTokenApi.data.token);
                        setRefreshToken(responseRefreshTokenApi.data.refresh_token);

                        setAuthenticated(responseInitApiRefresh.data.data.isAuthenticated);
                        setLoading(false);
                        setRole(whatRoleAmI(responseInitApiRefresh.data.data.user.roles));
                        setUser(responseInitApiRefresh.data.data.user);

                        await SERVER_API.security.refresh(responseRefreshTokenApi.data.token, responseRefreshTokenApi.data.refresh_token);

                        return;
                    } catch (e) {
                        setAuthenticated(false)
                        setLoading(false);
                        return;
                    }
                } else {
                    setAuthenticated(false)
                    setLoading(false);
                    return;
                }
            }
        };

        initializedAuth();
    }, []);

    async function handleLogout() {
        await SERVER_API.security.logout();

        setToken(null);
        setRefreshToken(null);

        setAuthenticated(false);
        setLoading(false);
        setRole(null);
        setUser(null);

        return router.push(ROUTE_LOGIN);
    }

    async function setLogin(data) {
        await setToken(data.data.token);
        await setRefreshToken(data.data.refresh_token);

        await setAuthenticated(true);
        await setRole(whatRoleAmI(data.data.user.roles));
        await setUser(data.data.user);
    }

    return (
        <AuthContext.Provider value={{
            isLoading,
            isAuthenticated,
            setAuthenticated,
            token,
            refreshToken,
            role,
            user,
            handleLogout,
            setLogin,
        }}>
            {children}
        </AuthContext.Provider>
    )
};
export default AuthContextProvider;

export function useAuthenticated() {
    return useContext(AuthContext);
}


