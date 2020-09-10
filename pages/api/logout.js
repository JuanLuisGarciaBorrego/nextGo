import cookie from 'cookie'
import {COOKIE_AUTH, COOKIE_REFRESH_AUTH} from "../../src/constants/cookies";

export default async function logout(req, res) {

    const cookieSerialized = cookie.serialize(COOKIE_AUTH, '', {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: -1,
        httpOnly: true,
        path: '/',
    });

    const cookieSerializedRefresh = cookie.serialize(COOKIE_REFRESH_AUTH, '', {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: -1,
        httpOnly: true,
        path: '/',
    });

    res.setHeader('Set-Cookie', [cookieSerialized, cookieSerializedRefresh]);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.json({'message': "Logout success"});
}
