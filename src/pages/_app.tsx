import '../styles/globals.css'
import Head from 'next/head'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import store from '../app/store'
import Layout from '../components/Layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>

      <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
        
    </Head>
    <Provider store={store}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </Provider>
    </>
  )
}
