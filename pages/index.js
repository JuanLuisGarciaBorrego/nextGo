import Head from 'next/head'

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>NextGo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className="h-screen bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"> </div>
    </div>
  )
}
