import React from 'react'
import { useSelector } from 'react-redux'
import { Note } from '../interfaces'
import NoteCard from './NoteCard'

function NoteCards() {
  const notes = useSelector((state: any) => state.notes.notes)

  return (
    <>
      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-between max-w-7xl flex-wrap items-center">
        {notes.map((note:Note) => (
          <NoteCard note={note} key={note.title} />
        ))}
      </div>
    </>
  )
}

export default NoteCards
