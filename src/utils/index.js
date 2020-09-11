import {isServerRequest} from "./request";
import {whatRoleAmI} from "./security";
import {buildInfoPaginationObject} from "./infoPagination";
import {throwErrorPage} from "./throwErrorPage";
import {getServerCookie, getCookies, updateCookie, removeCookie} from "./cookie";

export {
    isServerRequest,
    whatRoleAmI,
    getServerCookie,
    getCookies,
    updateCookie,
    removeCookie,
    buildInfoPaginationObject,
    throwErrorPage
};
