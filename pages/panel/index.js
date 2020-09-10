import Head from 'next/head'
import WrapperSecurity from "../../src/components/WrapperSecurity";
import Link from "next/link";
import React from "react";

function HomePage() {

    console.log('panel vista')
  return (
    <div>
      <Head>
        <title>Panel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

       Panel

        <Link href="/">
            <a>public inicio</a>
        </Link>

        <Link href="/panel/hola">
            <a>private hola</a>
        </Link>
    </div>
  )
}
export default WrapperSecurity(HomePage)
