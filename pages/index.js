import React, {useContext} from 'react';
import Head from 'next/head'
import {AuthContext} from "../src/context/AuthContext";
import Link from 'next/link'

export default function HomePage() {

    const {isLogged} = useContext(AuthContext);
        console.log('Hola yeaaa', isLogged)
    return (
        <div>
            <Head>
                <title>NextGo</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            Hola is logged  = {isLogged === false ? 'noo':'yes'}
            <Link href="/hola">
                <a>Hola public</a>
            </Link>

            <Link href="/panel">
                <a>panel</a>
            </Link>
            <div className="h-screen bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"></div>
        </div>
    )
}
