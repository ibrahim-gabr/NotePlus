/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import ViewModal from './ViewModal'
import EditModal from './EditModal'
import { useDispatch } from 'react-redux'
import { action, Note } from '../interfaces'
import { asyncDeleteNote } from '../features/notes/notesSlice'

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

interface dropdownProps {
  actions : action[]
  note:Note
}
export default function NoteDropdown({actions,note}:dropdownProps) {
  
  const dispatch = useDispatch()
    const [viewModal, setViewModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const handleClick = (clickHanndle:string) => {
        if(clickHanndle === 'viewModal'){
            setViewModal(!viewModal)
        }
        if(clickHanndle === 'editModal'){
            setEditModal(!editModal)
           
        }
        if(clickHanndle === 'deleteModal'){
            dispatch(asyncDeleteNote(note.id!));
        }
    }
  return (
      <>
    <Menu as="div" className="relative inline-block text-left">
       <div>
        <Menu.Button className=" flex items-center outline-none text-gray-400 hover:text-gray-600 focus:outline-none  ">
          <span className="sr-only">Open options</span>
          <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            {actions.map((action:action) => (
              <Menu.Item key={action.name}>
                {({ active }) => (
                  <span
                  
                    onClick = {e => handleClick(action.click)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4  py-2 text-md'
                    )}
                  >
                    <action.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                    {action.name}
                  </span>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>

    { <ViewModal note={note} open={viewModal} onClose={handleClick} />}
    { <EditModal note={note} open={editModal} onClose={handleClick} />}
    </>
  )
}
