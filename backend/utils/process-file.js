/**
 * Processes the content of a file and extracts valid lines based on specific criteria.
 * @param {string} fileName - The name of the file to match against the `file` field in the content.
 * @param {string} fileContent - The content of the file as a string, where each line is separated by a newline character.
 * @returns {Array<Object>|null} - Returns an array of objects representing valid lines, or `null` if the content is empty.
 */
const processFile = (fileName, fileContent) => {
  if (!fileContent) return null

  const lines = fileContent.trim().split('\n')
  if (lines.length <= 1) return []

  return lines.slice(1).reduce((validLines, line) => {
    const [file, text, numberStr, hex] = line.split(',')

    if (file === fileName && text && numberStr && hex) {
      if (/^\d+$/.test(numberStr)) {
        validLines.push({
          text: text.trim(),
          number: parseInt(numberStr, 10),
          hex: hex.trim()
        })
      }
    }

    return validLines
  }, [])
}

/**
 * Processes the content of a file and handles errors
 * @param {string} fileName - Name of the file
 * @param {string} fileContent - Content of the file
 * @returns {Object} - Object with processed data
 */
const processFileContent = (fileName, fileContent) => {
  try {
    const processedLines = processFile(fileName, fileContent)
    return {
      fileName,
      lines: processedLines
    }
  } catch (err) {
    console.error(`Error processing file: ${fileName}`, err)
    return {
      fileName,
      lines: [],
      error: 'Processing failed'
    }
  }
}

/**
 * Validator for file list response
 * @param {Object} response - API response
 * @returns {boolean} - true if the response is valid
 */
const isValidFileListResponse = (response) =>
  response && response.files && Array.isArray(response.files)

module.exports = {
  processFile,
  processFileContent,
  isValidFileListResponse
}
