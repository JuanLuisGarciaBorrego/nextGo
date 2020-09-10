import {getServerCookie} from "../../src/utils";
import {COOKIE_AUTH, COOKIE_REFRESH_AUTH} from "../../src/constants/cookies";

export default async (req, res) => {

    let data = {
        hasCookies: false,
        cookies: {}
    }
    const serverCookies = await getServerCookie(req);

    if (Object.entries(serverCookies).length === 0) {
        return res.json(data);
    }

    data = {
        hasCookies: true,
        cookies: {
            'auth': serverCookies[COOKIE_AUTH],
            'refresh': serverCookies[COOKIE_REFRESH_AUTH]
        }
    }

    return res.json(data);
}
