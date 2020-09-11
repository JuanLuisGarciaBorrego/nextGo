import React from 'react';
import {useAuthenticated} from "../src/context/AuthContext";
import Nav from "../src/components/Nav";

export default function HomePage() {

    const {isAuthenticated} = useAuthenticated();
    console.log('Hola estoy en home authenticated?', isAuthenticated)
    return (
        <div>
            <Nav/>
            Home  a todos
        </div>
    )
}
