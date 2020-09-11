import cookie from 'cookie'
import API from "../../src/api";
import {COOKIE_AUTH, COOKIE_REFRESH_AUTH, COOKIE_MAX_AGE} from "../../src/constants/cookies";

export default async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Only support POST'});
    }

    try {
        const response = await API.security.login(req.body.email, req.body.password);

        const cookieSerialized = cookie.serialize(COOKIE_AUTH, response.data.token, {
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: COOKIE_MAX_AGE,
            httpOnly: true,
            path: '/'
        });

        const cookieRefreshSerialized = cookie.serialize(COOKIE_REFRESH_AUTH, response.data.refresh_token, {
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: COOKIE_MAX_AGE,
            httpOnly: true,
            path: '/'
        });

        res.setHeader('Set-Cookie', [cookieSerialized, cookieRefreshSerialized]);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = response.status;

        return res.json({'data': response.data});

    } catch (e) {
        res.statusCode = e.response.status;
        return res.json(e.response.data);
    }
}
