import React from 'react';
import {useAuthenticated} from "../src/context/AuthContext";
import Nav from "../src/components/Nav";

export default function HelloPage() {

    const {isAuthenticated} = useAuthenticated();
    console.log('Hola estoy en hola public authenticated?', isAuthenticated)
    return (
        <div>
            <Nav/>
            Hola public
        </div>
    )
}
