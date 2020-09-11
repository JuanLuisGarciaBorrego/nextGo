import {
    ROLE_ADMIN,
    ROLE_USER
} from "../constants/roles";

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

export default {whatRoleAmI};
