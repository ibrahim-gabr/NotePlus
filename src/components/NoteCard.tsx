import {
  CalendarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import moment from 'moment'
import React from 'react'
import { action, Note } from '../interfaces'
import NoteDropdown from './NoteDropdown'


interface Props {
  note: Note
}
function NoteCard({ note }: Props) {

  const actions:action[] = [
    {
      name: 'View',
      icon: EyeIcon,
      click : 'viewModal',
    },
    {
      name: 'Edit',
      icon: PencilIcon,
      click : 'editModal',
    },
    {
      name: 'Delete',
      icon: TrashIcon,
      click : 'deleteModal',
    },
  ]
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden max-w-lg ">
      <div className="flex-1 bg-white p-6 flex flex-col justify-between hover:bg-purple-200">
        <div className="flex-1">
          <p className="text-sm font-medium ">
            <div className="hover:underline flex  justify-between">
              <div className="flex items-center space-x-3 justify-even">
                {note.tags?.map((tag) => (
                
                    <span key={tag.id} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                      {tag.name}
                    </span>
               
                ))}
              </div>
              <NoteDropdown actions={actions} note={note}/>
            </div>
          </p>
          <div className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">{note.title}</p>
            <div dangerouslySetInnerHTML={{__html :note.body}} className="mt-3 text-base text-gray-500"></div>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <div>
              {/* <span className="sr-only">{note.author.name}</span> */}
              {/* <img className="h-10 w-10 rounded-full" src={note.author.imageUrl} alt="" /> */}
            </div>
          </div>
          <div className="ml-3 flex justify-between w-full">
            <p className="text-sm font-medium text-gray-900">
              <span className="hover:underline">{/* {note.author.name} */}</span>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500 items-center w-full ">
              <CalendarIcon className="h-6 w-6 mr-1" />
              {moment(note.created_at).format('MMMM Do YYYY')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteCard
