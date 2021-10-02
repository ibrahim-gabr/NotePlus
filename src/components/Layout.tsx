import { useState } from 'react'
import NewNote from './NewNote'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function Layout({ children }) {
  const [newNote, showNewNote] = useState(false)

  return (
    <div className="flex bg-gray-100">
      <Sidebar newNote={newNote} showNewNote={showNewNote}/>

      <main className="max-w-7xl sm:px-6 lg:px-8 flex-1 flex flex-col">
        <TopBar newNote={newNote} showNewNote={showNewNote} />
       {<NewNote newNote={newNote} showNewNote={showNewNote} />}
        {children}
      </main>
    </div>
  )
}
