import {
    ROUTE_CHANGE_RECOVERY_PASSWORD,
    ROUTE_LOGIN,
    ROUTE_LOGIN_REDIRECT_SUCCESS,
    ROUTE_RECOVERY_PASSWORD
} from "../constants/routes";
import {
    ROLE_ADMIN,
    ROLE_USER
} from "../constants/roles";

export const accessControl = [
    {path: ROUTE_LOGIN, type: 'public_logged_in'},
    {path: ROUTE_RECOVERY_PASSWORD, type: 'public_logged_in'},
    {path: ROUTE_CHANGE_RECOVERY_PASSWORD, type: 'public_logged_in'},
    {path: ROUTE_LOGIN_REDIRECT_SUCCESS, type: 'private'},
];

export function checkAccessControl(router) {
    const path = router.pathname;

    const match = accessControl.find(item => path.includes(item.path))

    if (!match) {
        return;
    }

    return match;
}

export const whatRoleAmI = (roles = []) => {

    let roleAdmin = roles.includes(ROLE_ADMIN);
    let roleUser = roles.includes(ROLE_USER);

    if (roleAdmin) {
        return ROLE_ADMIN;
    } else if (roleUser) {
        return ROLE_USER;
    }

    return null;
};


export default {accessControl, checkAccessControl, whatRoleAmI};
