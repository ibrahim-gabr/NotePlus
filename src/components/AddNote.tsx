import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CKEditor } from 'ckeditor4-react'
import { asyncSaveNote } from '../features/notes/notesSlice'
import { CheckCircleIcon } from '@heroicons/react/outline'
import Autocomplete from 'react-autocomplete'
import { Tag } from '../interfaces'

interface NewNoteProps {
 
  showNewNote: Dispatch<SetStateAction<boolean>>
}

const AddNote = ({showNewNote}:NewNoteProps) => {

  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const tags = useSelector((state: any) => state.tags.tags)
  const [formattedTags, setFormattedTags] = useState([])
  const [pickerItems, setPickerItems] = useState(formattedTags)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    let preformattedTags = []
    if (tags.length > 0) {
      preformattedTags = tags.map((tag: Tag) => ({
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
      title,
      body: content,

      tag_id: selectedTags.map((t: any): t is Tag => t.id),
    }
    dispatch(asyncSaveNote(note_to_handle))
    setContent('')
    setTitle('')
    setSelectedTags([])
  }

  const handleSelect = (value: string) => {
    const tag:Tag = pickerItems.filter((t: any): t is Tag => t.label == value)[0]
    const tagExists = selectedTags.filter((t: any): t is Tag => t.id == tag.id)[0]

    if (!tagExists) {
      const selectedTagsUpdated:Tag[] = [...selectedTags , tag]
      setSelectedTags(selectedTagsUpdated)
    } else {
      setSelectedTags(selectedTags.filter((t: any): t is Tag => t.id != tag.id))
    }
  }
  return (
  
      <div className="bg-white  mb-6 py-6 px-4">
        <div className="flex space-x-3 mb-2">
          <label htmlFor="title" className="text-2xl">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter Note title"
          />
        </div>
        <CKEditor
          initData={content}
          type="classic"
          onChange={(editor) => {
            const data = editor.editor.getData()
            setContent(data)
          }}
        />
        <div className="tags mt-3 py-4 flex justify-around items-center">
          <div className="relative ">
            <span className="mr-2 ">Select Tags</span>
            <Autocomplete
              getItemValue={(item) => item.label}
              items={pickerItems}
              renderItem={(item, isHighlighted) => {
                const isSelected = selectedTags.filter((t:any):t is Tag => t.label == item.label)

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
          <div className="flex space-x-1">
            {selectedTags?.map((t: Tag) => (
              <span
                key={t.id}
                className="inline-flex items-center  px-2.5 py-0.5 rounded-md text-sm font-medium bg-pink-100 text-pink-800"
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => {
              showNewNote(false)
              handleSave()
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={() => showNewNote(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    
  )
}

export default AddNote
