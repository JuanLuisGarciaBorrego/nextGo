import Head from 'next/head'
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>NextGo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Link href="/">
            <a>inicio</a>
        </Link>----------
        <Link href="/panel">
            <a>panel</a>
        </Link>
        <div className="h-screen bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"> </div>
    </div>
  )
}
