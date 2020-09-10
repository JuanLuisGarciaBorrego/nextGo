import React, {useState, useEffect, createContext} from 'react';
import SERVER_API from "../api/server";
import {useRouter} from 'next/router'
import {checkAccessControl, whatRoleAmI} from "../utils";
import API from "../api";
import {ROUTE_LOGIN, ROUTE_LOGIN_REDIRECT_SUCCESS} from "../constants/routes";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const router = useRouter()

    const [token, setToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function loadUserFromCookies() {
            let loadToken = null;
            let loadRefreshToken = null;
            let loadIsLogged = false;
            let loadRole = null;
            let loadUser = null;

            const response = await SERVER_API.security.init();
            const accessControl = checkAccessControl(router);

            let jsonInitApi = null;

            if (response.data.hasCookies) {
                try {
                    const responseInitApi = await API.security.init(response.data.cookies.auth)
                    jsonInitApi = await responseInitApi.data.data;

                    loadToken = response.data.cookies.auth;
                    loadRefreshToken = response.data.cookies.refresh;
                    loadIsLogged = jsonInitApi.isLogged;
                    loadRole = whatRoleAmI(jsonInitApi.user.roles);
                    loadUser = jsonInitApi.user;
                } catch (e) {
                    if (e.response.status === 401 && response.data.cookies.refresh) {
                        try {
                            const responseRefreshToken = await API.security.refresh(response.data.cookies.refresh)
                            const jsonRefreshApi = await responseRefreshToken.data;

                            const responseInitApiRefresh = await API.security.init(jsonRefreshApi.token);
                            const jsonInitApiRefresh = await responseInitApiRefresh.data.data;

                            loadToken = jsonRefreshApi.token;
                            loadRefreshToken = jsonRefreshApi.refresh_token;
                            loadIsLogged = jsonInitApiRefresh.isLogged;
                            loadRole = whatRoleAmI(jsonInitApiRefresh.user.roles);
                            loadUser = jsonInitApiRefresh.user;

                        } catch (e) {
                            if (router.pathname !== ROUTE_LOGIN) {
                                return router.push(ROUTE_LOGIN);
                            }
                        }
                    }
                }
            }

            if (accessControl) {
                if (accessControl.type === 'public_logged_in' && loadIsLogged) {
                    return router.push(ROUTE_LOGIN_REDIRECT_SUCCESS);
                }

                if (accessControl.type === 'private' && loadIsLogged === false) {
                    return router.push(ROUTE_LOGIN);
                }
            }

            await setToken(loadToken);
            await setRefreshToken(loadRefreshToken);
            await setIsLogged(loadIsLogged);
            await setRole(loadRole);
            await setUser(loadUser);
            console.log('use effect security principal');
        }

        loadUserFromCookies();

    }, []);


    async function handleLogout() {
        await SERVER_API.security.logout();

        await setToken(null);
        await setRefreshToken(null);
        await setIsLogged(false);
        await setRole(null);
        await setUser(null);

        return router.push(ROUTE_LOGIN);
    }

    async function setLogin(data) {
        await setToken(data.token);
        await setRefreshToken(data.refresh_token);
        await setIsLogged(true);
        await setRole(whatRoleAmI(data.roles));
        await setUser(data.user);
    }

    return (
        <AuthContext.Provider value={{
            handleLogout,
            token,
            refreshToken,
            isLogged,
            role,
            user,
            setLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
};
export default AuthContextProvider;


