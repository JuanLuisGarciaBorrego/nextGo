import React from "react";
import {useAuthenticated} from "../../src/context/AuthContext";
import Nav from "../../src/components/Nav";
import withAuth from "../../src/utils/wrapper/withAuth";

function HomePage() {

    const {isAuthenticated} = useAuthenticated();
    console.log('Hola estoy en panel hola authenticated?', isAuthenticated)
    return (
        <div>
            <Nav/>
            Panel hola
        </div>
    )
}

export default withAuth(HomePage);
