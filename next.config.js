const withCss = require('@zeit/next-css');
const withPWA = require("next-pwa")

const isProd = process.env.NODE_ENV === "production";

module.exports = withPWA(withCss({
    pwa: {
        disable: !isProd,
        dest: "public"
    }
}));
