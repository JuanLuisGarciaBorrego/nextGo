import React from 'react';
import LayoutAuth from "../src/components/layout/LayoutAuth";
import Login from "../src/components/Login";
import {NextSeo} from 'next-seo';
import withoutAuth from "../src/utils/wrapper/withoutAuth";

function LoginPage() {
    return (
        <LayoutAuth>
            <NextSeo
                title="Entrar"
                description="Entrar al área segura"
            />
            <Login/>
        </LayoutAuth>
    )
}

export default withoutAuth(LoginPage);
