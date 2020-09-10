import {isServerRequest} from "./request";
import {accessControl, checkAccessControl, whatRoleAmI} from "./security";
import {buildInfoPaginationObject} from "./infoPagination";
import {throwErrorPage} from "./throwErrorPage";
import {getServerCookie, getCookies, updateCookie, removeCookie} from "./cookie";

export {
    isServerRequest,
    accessControl,
    checkAccessControl,
    whatRoleAmI,
    getServerCookie,
    getCookies,
    updateCookie,
    removeCookie,
    buildInfoPaginationObject,
    throwErrorPage
};
