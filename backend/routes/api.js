const express = require('express')
const router = express.Router()

const { getFileList, getFileByName } = require('../services/secretService.js')

// Utils
const {
  processFile,
  processFileContent,
  isValidFileListResponse
} = require('../utils/process-file.js')

const ERROR_MESSAGES = {
  INVALID_FILE_LIST: 'Invalid file list response',
  INTERNAL_SERVER: 'Internal Server Error',
  FILE_NOT_FOUND: (fileName) =>
    `The file ${fileName} could not be processed or does not contain valid data`
}

// Routes
router.get('/files/list', async (_req, res) => {
  try {
    const response = await getFileList()

    if (!isValidFileListResponse(response)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_FILE_LIST })
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Error fetching file list:', error)
    res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER })
  }
})

router.get('/files/data', async (req, res) => {
  try {
    const { fileName } = req.query

    if (fileName) {
      const fileContent = await getFileByName(fileName)

      if (!fileContent) {
        return res.status(404).json({
          error: ERROR_MESSAGES.FILE_NOT_FOUND(fileName)
        })
      }

      const result = processFile(fileName, fileContent)

      return res.status(200).json({
        fileName,
        lines: result
      })
    }

    const fileList = await getFileList()

    if (!isValidFileListResponse(fileList)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_FILE_LIST })
    }

    const files = await Promise.all(
      fileList.files.map(async (fileName) => {
        try {
          const fileContent = await getFileByName(fileName)

          if (fileContent === null) {
            return null
          }

          return { fileName, fileContent }
        } catch (err) {
          console.error(`Error fetching file: ${fileName}`, err)
          return null
        }
      })
    )

    const validFiles = files.filter((file) => file !== null)
    const results = validFiles.map(({ fileName, fileContent }) =>
      processFileContent(fileName, fileContent)
    )

    return res.status(200).json({ data: results })
  } catch (error) {
    console.error('Error processing files:', error)
    res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER })
  }
})

module.exports = router
