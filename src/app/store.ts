import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { notesSlice } from '../features/notes/notesSlice'
import { tagsSlice } from '../features/tags/tagSlice'

export function makeStore() {
  return configureStore({
    reducer: { notes:notesSlice.reducer,tags : tagsSlice.reducer },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
