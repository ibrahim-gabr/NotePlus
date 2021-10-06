/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationIcon, XIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { asyncSaveNote } from '../features/notes/notesSlice'
import Autocomplete from 'react-autocomplete'
import { CKEditor } from 'ckeditor4-react'
import { Note, Tag } from '../interfaces'

interface EditModalProps {
  note:Note
  open: boolean
  onClose: (clickHanndle: string | boolean) => void
}

export default function EditModal({ note, open, onClose }:EditModalProps) {
  const [content, setContent] = useState(note.body)
  const [title, setTitle] = useState('')
  const tags = useSelector((state: any) => state.tags.tags)
  const [formattedTags, setFormattedTags] = useState([])
  const [pickerItems, setPickerItems] = useState(formattedTags)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState('')
  const dispatch = useDispatch()


  useEffect(() => {
    setContent(note?.body)
    setTitle(note?.title)
    setSelectedTags([])
    note?.tags?.map((tag:Tag) => {
      const selectedTagsUpdated:Tag[] = [...selectedTags , { id: tag.id, label: tag.name, value: tag.name }]

      tag.name != 'All' &&
        setSelectedTags(selectedTagsUpdated)
    })
    // setTags(activeNote?.tags);
  }, [note])


  useEffect(() => {
    let preformattedTags = []
    if (tags.length > 0) {
      preformattedTags = tags.map((tag:Tag) => ({
        value: tag.name,
        label: tag.name,
        id: tag.id,
      }))
    }
    setFormattedTags(preformattedTags)
  }, [tags])

  useEffect(() => {
    setPickerItems(formattedTags)
  }, [formattedTags])

  const handleSave = () => {
    const note_to_handle = {
      id: note.id,
      title,
      body: content,

      tag_id: selectedTags.map((t:any):t is Tag => t.id),
    }

    dispatch(asyncSaveNote(note_to_handle))
  }
  const handleSelect = (value:string) => {
    const tag:Tag = pickerItems.filter((t:any):t is Tag => t.label == value)[0]
    const tagExists = selectedTags.filter((t:any):t is Tag => t.id == tag.id)[0]

    if (!tagExists) {
      const selectedTagsUpdated:Tag[] = [...selectedTags , tag]
      setSelectedTags(selectedTagsUpdated)
    } else {
      setSelectedTags(selectedTags.filter((t:any):t is Tag => t.id != tag.id))
    }
  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 " onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 "
                  onClick={() => onClose('editModal')}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title as="h3" className="text-3xl leading-6 font-medium text-gray-900">
                    {note.title}
                  </Dialog.Title>
                  <div className="mt-4 w-full">
                    <CKEditor
                      type="classic"
                      name={'edit_note'}
                      initData={content}
                      onChange={(editor) => {
                        const data = editor.editor.getData()

                        setContent(data)
                      }}
                    />
                  </div>
                  <div className="tags mt-3 ">
                    <div className="flex space-x-1">
                      {selectedTags?.map((t:Tag) => (
                        <span
                          key={t.id}
                          className="inline-flex items-center  px-2.5 py-0.5 rounded-md text-sm font-medium bg-pink-100 text-pink-800"
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 relative">
                      <Autocomplete
                 
                        getItemValue={(item) => item.label}
                        items={pickerItems}
                        renderItem={(item, isHighlighted) => {
                          const isSelected = selectedTags.filter((t) => t.label == item.label)

                          return (
                            <div
                              key={item.id}
                              style={{
                                background: isHighlighted ? '#EAEAEA' : 'white',
                                padding: '0.5rem',
                              }}
                              className="flex "
                            >
                              {isSelected.length > 0 && (
                                <CheckCircleIcon className="h-4 w-4 bg-green-400 mr-2" />
                              )}
                              {item.label}
                            </div>
                          )
                        }}
                        inputProps={{
                          style: {
                            border: '1px solid gray',
                            borderRadius: '10px',
                            outline: 'none',
                          },
                        }}
                        value={selectedTag}
                        menuStyle={{
                          borderRadius: '3px',
                          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '2px 0',
                          top: '30px',
                          left: '0',
                          overflowY: 'scroll',
                          fontSize: '90%',
                          position: 'absolute',
                          width: '10%',
                          display: 'inline-block',

                          paddingTop: '1rem',
                        }}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        onSelect={(val) => handleSelect(val)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    onClose('editModal')
                    handleSave()
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => onClose('editModal')}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
