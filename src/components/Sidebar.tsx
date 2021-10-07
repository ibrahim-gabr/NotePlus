import React, { useState } from 'react'

import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  TagIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  DocumentIcon,
  TrashIcon,
  PlusIcon,
  ChevronDownIcon,
  MenuAlt2Icon,
} from '@heroicons/react/outline'

import Bar from './Bar'
import { useDispatch } from 'react-redux'
import { asyncGetAllNotes } from '../features/notes/notesSlice'

const navigation = [
  { name: 'All Notes', icon: DocumentIcon, href: '#', current: true , click: 'allNotes'},
  { name: 'Tags', icon: TagIcon, href: '#', count: 3, current: false, click: 'showBarUi' },
  // { name: 'Bin', icon: TrashIcon, href: '#', count: 4, current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface SidebarProps {
  newNote: boolean
  showNewNote: (arg0: boolean) => void
}

function Sidebar({ newNote, showNewNote }: SidebarProps) {
  const [showBarUi, setShowBarUi] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useDispatch()
  const handleClick = (clickHanndle: string) => {
    if (clickHanndle === 'showBarUi') {
      setShowBarUi(!showBarUi)
      setSidebarOpen(!sidebarOpen)
    }
    if (clickHanndle === 'allNotes') {
      dispatch(asyncGetAllNotes())
    }
  }

  return (
    <>
      <div className="  min-h-0 flex-col bg-gray-50  sm:bg-white h-screen sm:w-64 w-32 sm:ml-8 sm:flex">
        <div className="h-8 bg-gray-100"></div>
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="hidden sm:flex items-center flex-shrink-0 px-4 space-x-4 ">
            <span className="w-8 sm:w-16">
              <img className="rounded-md " src="./logo.png" alt="logo" />
            </span>
            <span className="font-normal text-2xl">NotePlus</span>
          </div>
          <nav className="mt-5 flex-1 px-4 bg-gray-50 sm:bg-white space-y-1" aria-label="Sidebar">
            <button
              onClick={(e) => {
                showNewNote(!newNote)
                setSidebarOpen(!sidebarOpen)
              }}
              className="hidden  mb-6 sm:flex space-x-8 bg-gray-800 w-full text-white py-2 px-4 rounded-md items-center justify-between "
            >
              <PlusIcon className="text-white h-5 w-5" />
              Add New
              <ChevronDownIcon className="h-5 w-5" />
            </button>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                  'group flex items-center px-2 py-3  text-base font-medium rounded-md '
                )}
              >
                <item.icon
                  className={classNames(
                    item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'hidden sm:block mr-3 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                <span className="flex-1 text-base " onClick={(e) => handleClick(item.click!)}>
                  {item.name}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
      <Bar open={showBarUi} onClose={setShowBarUi} />
    </>
  )
}

export default Sidebar
