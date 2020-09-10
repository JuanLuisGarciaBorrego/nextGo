import React from 'react';
import LayoutAuth from "../src/components/layout/LayoutAuth";
import {NextSeo} from 'next-seo';
import RecoveryPassword from "../src/components/RecoveryPassword";
import WrapperSecurity from "../src/components/WrapperSecurity";

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

export default WrapperSecurity(RecoveryPasswordPage)
