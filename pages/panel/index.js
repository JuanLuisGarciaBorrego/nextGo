import React from "react";
import {useAuthenticated} from "../../src/context/AuthContext";
import Nav from "../../src/components/Nav";
import withAuth from "../../src/utils/wrapper/withAuth";

function PanelPage() {

    const {isAuthenticated} = useAuthenticated();
    console.log('Hola estoy en panel authenticated?', isAuthenticated)
    return (
        <div>
            <Nav/>
            Panel
        </div>
    )
}

export default withAuth(PanelPage);
