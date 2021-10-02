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
} from '@heroicons/react/outline'

import { FiPlus, FiChevronDown } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import Bar from './Bar'

const navigation = [
  { name: 'Your Notes', icon: DocumentIcon, href: '#', current: true },
  { name: 'Tags', icon: TagIcon, href: '#', count: 3, current: false, click: 'showBarUi' },
  // { name: 'Bin', icon: TrashIcon, href: '#', count: 4, current: false },
]

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

interface SidebarProps {
  newNote: boolean
  showNewNote: (arg0: boolean) => void
}

function Sidebar({ newNote, showNewNote }:SidebarProps) {
  const [showBarUi, setShowBarUi] = useState(false)
  const handleClick = (clickHanndle:string) => {
    if (clickHanndle === 'showBarUi') {
      setShowBarUi(!showBarUi)
    }
  }

  return (
    <>
      <div className=" flex min-h-0 flex-col   bg-white h-screen  w-64 ml-8 ">
        <div className="h-8 bg-gray-100"></div>
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 space-x-4 ">
            <span className="w-16">
              <img className="rounded-md " src="./logo.png" alt="logo" />
            </span>
            <span className="font-normal text-2xl">NotePlus</span>
          </div>
          <nav className="mt-5 flex-1 px-4 bg-white space-y-1" aria-label="Sidebar">
            <button    onClick={(e) => showNewNote(!newNote)} className=" mb-6 flex space-x-8 bg-gray-800 w-full text-white py-2 px-4 rounded-md items-center justify-between ">
              <FiPlus className="text-white" />
              Add New
              <FiChevronDown />
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
                    'mr-3 flex-shrink-0 h-6 w-6'
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
        {/* <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <a href="#" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Tom Cook
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  View profile
                </p>
              </div>
            </div>
          </a>
        </div> */}
      </div>
      <Bar open={showBarUi} onClose={setShowBarUi} />
    </>
  )
}

export default Sidebar
