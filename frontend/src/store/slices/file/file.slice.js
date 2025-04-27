import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './file.state.js'

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    updateCurrentFileName(state, action) {
      state.currentFileName = action.payload
    },
  },
})

export { fileSlice }
