import { configureStore } from '@reduxjs/toolkit'
import { entrySlice } from './slices/blog'

export const store = configureStore({
  reducer: {
    entries: entrySlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch