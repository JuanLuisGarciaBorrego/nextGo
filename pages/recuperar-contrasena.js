import React from 'react';
import LayoutAuth from "../src/components/layout/LayoutAuth";
import {NextSeo} from 'next-seo';
import RecoveryPassword from "../src/components/RecoveryPassword";
import withoutAuth from "../src/utils/wrapper/withoutAuth";

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

export default withoutAuth(RecoveryPasswordPage)
