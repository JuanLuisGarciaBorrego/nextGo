import {isServerRequest} from "./request";
import {buildInfoPaginationObject} from "./infoPagination";
import {throwErrorPage} from "./throwErrorPage";

export {
    isServerRequest,

    getCookies,
    updateCookie,
    removeCookie,
    generateQueryStringFromObject,
    buildInfoPaginationObject,
    throwErrorPage
};
