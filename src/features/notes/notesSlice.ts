import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../components/Axios'
import { Note, NoteState, Tag } from '../../interfaces'

export const asyncGetAllNotes = createAsyncThunk('notes/asyncGetAllNotes', async () => {
  const result = await axios.get('/notes')

  return result.data.data
})

export const asyncSaveNote = createAsyncThunk('notes/asyncSaveNote', async (note: Note) => {
  if (note.id) {
    await axios.put(`/notes/${note.id}`, note)
  } else {
    await axios.post(`/notes`, note)
  }
  const result = await axios.get('/notes')
  return result.data.data
})
export const asyncDeleteNote = createAsyncThunk('notes/asyncDeleteNote', async (id: number) => {
  const deletedNote = await axios.delete(`/notes/${id}`)
  const result = await axios.get('/notes')
  return result.data.data
})
export const asyncGetTagNotes = createAsyncThunk('notes/asyncGetTagNotes', async (id: number) => {
  let result

  result = await axios.get(`/tags/${id}`)

  return result.data.data[0]
})
const initialState: NoteState = {
  notes: [],
}

const options = {
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state: NoteState, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload)
    },
  },
  extraReducers: (builder:ActionReducerMapBuilder<NoteState>) => {
    builder.addCase(
      asyncGetAllNotes.fulfilled,
      (state: NoteState, action: PayloadAction<Note[]>) => {
        state.notes = action.payload
      }
    ),
      builder.addCase(
        asyncGetTagNotes.fulfilled,
        (state: NoteState, action: PayloadAction<any>) => {
          const data = action.payload.notes
          state.notes = data.data
        }
      ),
      builder.addCase(
        asyncDeleteNote.fulfilled,
        (state: NoteState, action: PayloadAction<Note[]>) => {
          state.notes = action.payload
        }
      ),
      builder.addCase(
        asyncSaveNote.fulfilled,
        (state: NoteState, action: PayloadAction<Note[]>) => {
          state.notes = action.payload
        }
      )
  },
}

export const notesSlice = createSlice(options)
export const { addNote } = notesSlice.actions
