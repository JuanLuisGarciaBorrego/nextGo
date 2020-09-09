import {APP_DEFAULT_LOCALE, APP_DESCRIPTION, APP_NAME} from "./src/constants/app";

//https://github.com/garmeeh/next-seo

export default {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    openGraph: {
        type: 'website',
        locale: APP_DEFAULT_LOCALE,
        site_name: APP_NAME,
    },
}
