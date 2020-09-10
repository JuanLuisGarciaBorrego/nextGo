import React from 'react';
import LayoutAuth from "../src/components/layout/LayoutAuth";
import {NextSeo} from 'next-seo';
import RecoveryPassword from "../src/components/RecoveryPassword";
import Enter from "./entrar";

function RecoveryPasswordPage() {

    return (
        <LayoutAuth>
            <NextSeo
                title="Recuperar contraseña"
            />
            <RecoveryPassword/>
        </LayoutAuth>
    )
}

export async function getStaticProps() {

    return { props: {} }
}

export default RecoveryPasswordPage
