import React from 'react';
import LayoutAuth from "../src/components/layout/LayoutAuth";
import {NextSeo} from 'next-seo';
import ChangePasswordRecovery from "../src/components/ChangePasswordRecovery";
import withoutAuth from "../src/utils/wrapper/withoutAuth";

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

export default withoutAuth(ChangePasswordRecoveryPage);
