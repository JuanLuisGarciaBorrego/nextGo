import React from 'react';
import {useAuthenticated} from "../src/context/AuthContext";
import Nav from "../src/components/Nav";

export default function HomePage() {
    const {isAuthenticated} = useAuthenticated();

    return (
        <div>
            <Nav/>
        </div>
    )
}
