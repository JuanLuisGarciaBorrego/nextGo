import {isServerRequest} from "./request";
import {whatRoleAmI} from "./security";
import {buildInfoPaginationObject} from "./infoPagination";
import {throwErrorPage} from "./throwErrorPage";
import {getServerCookie, getCookies, updateCookie, removeCookie} from "./cookie";
import {bytesToMb} from "./convert";
import getCroppedImg from "./cropImage";

export {
    isServerRequest,
    whatRoleAmI,
    getServerCookie,
    getCookies,
    updateCookie,
    removeCookie,
    buildInfoPaginationObject,
    throwErrorPage,
    bytesToMb,
    getCroppedImg
};
