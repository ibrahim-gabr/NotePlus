import React, { Dispatch, SetStateAction } from 'react'
import { PencilIcon } from '@heroicons/react/outline'

interface TopBarProps{
  showNewNote:Dispatch<SetStateAction<boolean>>
  newNote:boolean
}
function TopBar({ showNewNote, newNote }:TopBarProps) {
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
