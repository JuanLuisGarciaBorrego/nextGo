import React from 'react';
import LayoutAuth from "../src/components/layout/LayoutAuth";
import {NextSeo} from 'next-seo';
import ChangePasswordRecovery from "../src/components/ChangePasswordRecovery";

function ChangePasswordRecoveryPage() {

    return (
        <LayoutAuth>
            <NextSeo
                title="Cambiar contraseña"
            />
            <ChangePasswordRecovery/>
        </LayoutAuth>
    )
}
export async function getStaticProps() {

    return { props: {} }
}

export default ChangePasswordRecoveryPage;
