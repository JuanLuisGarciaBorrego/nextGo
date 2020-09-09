import {APP_NAME} from "./src/constants/app";

module.exports = {
    apps : [
        {
            name: APP_NAME,
            script: "npm",
            args:"run start",
            env: {
                "HOST": "0.0.0.0",
                "PORT": 3000,
                "NODE_ENV": "production"
            }
        }
    ]
}
