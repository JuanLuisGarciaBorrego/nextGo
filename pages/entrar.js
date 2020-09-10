import React from 'react';
import LayoutAuth from "../src/components/layout/LayoutAuth";
import Login from "../src/components/Login";
import {NextSeo} from 'next-seo';

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

export async function getStaticProps() {

    return { props: {} }
}

export default LoginPage
