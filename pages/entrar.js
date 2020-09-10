import React from 'react';
import LayoutAuth from "../src/components/layout/LayoutAuth";
import Login from "../src/components/Login";
import {NextSeo} from 'next-seo';
import WrapperSecurity from "../src/components/WrapperSecurity";

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

export default WrapperSecurity(LoginPage)
