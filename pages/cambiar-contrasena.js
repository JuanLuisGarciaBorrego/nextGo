import React from 'react';
import LayoutAuth from "../src/components/layout/LayoutAuth";
import {NextSeo} from 'next-seo';
import ChangePasswordRecovery from "../src/components/ChangePasswordRecovery";
import WrapperSecurity from "../src/components/WrapperSecurity";

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

export default WrapperSecurity(ChangePasswordRecoveryPage)
