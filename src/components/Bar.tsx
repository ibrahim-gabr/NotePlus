/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PlusIcon, TrashIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetTagNotes } from '../features/notes/notesSlice'
import CreateTagModal from './CreateTagModal'
import { asyncDeleteTag } from '../features/tags/tagSlice'
import { Tag } from '../interfaces'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface BarProps {
  open: boolean
  onClose: Dispatch<SetStateAction<boolean>>
}

export default function Bar({ open, onClose }: BarProps) {
  const tags = useSelector((state: any) => state.tags.tags)
  const dispatch = useDispatch()
  const [createTagModal, setCreateTagModal] = useState<boolean>(false)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={onClose}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-xs">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="p-6 px-3 border-b border-gray-400">
                    <div className="flex items-start justify-between">
                      <div>
                        <Dialog.Title className="text-2xl font-medium text-gray-900">
                          Tag List
                        </Dialog.Title>
                      </div>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 "
                          onClick={() => setCreateTagModal(!createTagModal)}
                        >
                          <span className="sr-only">Close panel</span>
                          <PlusIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <CreateTagModal open={createTagModal} onClose={setCreateTagModal} />

                  <ul role="list" className="flex-1 divide-y divide-gray-400 overflow-y-auto">
                    {tags.map((tag: Tag) => (
                      <li key={tag.name}>
                        <div className="relative group py-4 px-5 flex items-center">
                          <div className="-m-1 flex-1 block p-1">
                            <div
                              className="absolute inset-0 group-hover:bg-gray-50"
                              aria-hidden="true"
                            />
                            <div className="flex-1 flex items-center min-w-0 relative">
                              <div className="ml-4 truncate flex justify-between items-ceter w-full">
                                <p
                                  className="text-xl font-medium text-gray-900 truncate flex-1"
                                  onClick={(e) => dispatch(asyncGetTagNotes(tag.id!))}
                                >
                                  {tag.name}
                                </p>
                                <TrashIcon
                                  className="h-6 w-6"
                                  onClick={(e) => dispatch(asyncDeleteTag(tag.id!))}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
