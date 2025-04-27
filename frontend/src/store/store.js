import { configureStore } from '@reduxjs/toolkit'
import { filesAPI } from '../api/api.js'
import { fileSlice } from './slices/file/file.index.js'

export const store = configureStore({
  reducer: {
    [filesAPI.reducerPath]: filesAPI.reducer,
    [fileSlice.reducerPath]: fileSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(filesAPI.middleware),
})
