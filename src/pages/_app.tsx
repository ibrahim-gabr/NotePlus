import '../styles/globals.css'
import Head from 'next/head'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import store from '../app/store'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import { useState } from 'react'
import AddNote from '../components/AddNote'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [addNoteFlag, showNewNote] = useState<boolean>(false)

  return (
    <>
      <Head>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <Provider store={store}>
        <div className="flex bg-gray-100">
          <Sidebar newNote={addNoteFlag} showNewNote={showNewNote} />

          <main className="max-w-7xl sm:px-6 lg:px-8 flex-1 flex flex-col">
            <TopBar newNote={addNoteFlag} showNewNote={showNewNote} />
            {addNoteFlag && <AddNote  showNewNote={showNewNote} />}
            <Component {...pageProps} />
          </main>
        </div>
      </Provider>
    </>
  )
}
