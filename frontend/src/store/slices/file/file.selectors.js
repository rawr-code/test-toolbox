import { createSelector } from '@reduxjs/toolkit'

const fileSelector = state => {
  if (!state.file) {
    throw new Error('file slice is not available.')
  }

  return state.file
}

const selectCurrentFileName = createSelector([fileSelector], file => {
  return file.currentFileName
})

export { selectCurrentFileName }
