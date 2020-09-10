import Head from 'next/head'
import WrapperSecurity from "../../src/components/WrapperSecurity";
import Link from "next/link";
import React from "react";

function HomePage() {

    console.log('panel hola')
    return (
        <div>
            <Head>
                <title>Panel</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            hola pivada

            <Link href="/panel/">
                <a>panel</a>
            </Link>

            <Link href="/">
                <a>inicio publico</a>
            </Link>
        </div>
    )
}

export default WrapperSecurity(HomePage)
