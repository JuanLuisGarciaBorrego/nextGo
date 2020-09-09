import {parseCookies, setCookie, destroyCookie} from 'nookies';
import {COOKIE_HTTP_ONLY, COOKIE_MAX_AGE} from "../constants/cookies";

export async function getCookies(ctx) {
    return parseCookies(ctx);
}

export function updateCookie(name, value, ctx = null) {
    setCookie(ctx, name, value, {
        maxAge: COOKIE_MAX_AGE,
        path: '/',
        secure: COOKIE_HTTP_ONLY, //if http only is false and secure if true, not working, so put same value
        sameSite: true,
        httpOnly: COOKIE_HTTP_ONLY,
    })
}

export function removeCookie(name, ctx = null) {
    destroyCookie(ctx, name);
}

export async function getCookie(name, ctx = null) {
    const cookies = await getCookies(ctx);

    return cookies[name];
}

export default {getCookies, updateCookie, removeCookie}
