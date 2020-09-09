import Document, {Html, Head, Main, NextScript} from 'next/document'
import {APP_DEFAULT_LOCALE, APP_DESCRIPTION, APP_NAME} from "../src/constants/app";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html lang={APP_DEFAULT_LOCALE}>
                <Head>
                    <link rel="author" href="/humans.txt" />
                    {/*<link rel="manifest" href="/manifest.json"/>*/}
                    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
                    <meta name="mobile-web-app-capable" content="yes"/>
                    <meta name="apple-mobile-web-app-capable" content="yes"/>
                    <meta name="application-name" content={APP_NAME}/>
                    <meta name="apple-mobile-web-app-title" content={APP_NAME}/>
                    <meta name="theme-color" content="#38a169"/>
                    <meta name="msapplication-navbutton-color" content="#000"/>
                    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
                    <meta name="msapplication-starturl" content="/"/>
                    {/*<link rel="apple-touch-icon" href="/static/ico.png"/>*/}
                    {/*<link rel="icon" sizes="192x192" href="/static/icons/icon-72x72.png"/>*/}

                    <meta property="og:locale" content="es" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={APP_NAME} />
                    <meta property="og:description" content={APP_DESCRIPTION} />
                    {/*<meta property="og:url" content="URL" />*/}
                    <meta property="og:site_name" content={APP_NAME} />
                    {/*<meta property="og:image" content="/static/social_image.png"/>*/}
                    {/*<meta property="og:image:width" content="1200" />*/}
                    {/*<meta property="og:image:height" content="628" />*/}
                    <meta property="og:type" content="website" />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:description" content={APP_DESCRIPTION} />
                    <meta name="twitter:title" content={APP_NAME} />
                    {/*<meta name="twitter:image" content="/static/social_image.png"/>*/}
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument;
