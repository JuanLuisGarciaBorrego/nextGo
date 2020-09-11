import cookie from 'cookie'
import {COOKIE_AUTH, COOKIE_REFRESH_AUTH, COOKIE_MAX_AGE} from "../../src/constants/cookies";

export default async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Only support POST'});
    }

    try {
        const {token, refresh_token} = req.body;

        const cookieSerialized = cookie.serialize(COOKIE_AUTH, token, {
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: COOKIE_MAX_AGE,
            httpOnly: true,
            path: '/'
        });

        const cookieRefreshSerialized = cookie.serialize(COOKIE_REFRESH_AUTH, refresh_token, {
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: COOKIE_MAX_AGE,
            httpOnly: true,
            path: '/'
        });

        res.setHeader('Set-Cookie', [cookieSerialized, cookieRefreshSerialized]);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;

        return res.json({'data': "refresh"});

    } catch (e) {
        res.statusCode = e.response.status;
        return res.json(e.response.data);
    }
}
