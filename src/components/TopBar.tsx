import React from 'react'
import { PencilIcon } from '@heroicons/react/outline'

function TopBar({ showNewNote, newNote }) {
  return (
    <div
      onClick={(e) => showNewNote(!newNote)}
      className="my-8 bg-white rounded-lg p-6 w-full h-16 max-w-5xl flex space-x-4 items-center justify-center"
    >
      <PencilIcon className="w-4" />

      <span>Write Your Note</span>
    </div>
  )
}

export default TopBar
