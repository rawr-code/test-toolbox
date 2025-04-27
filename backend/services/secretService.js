const BASE_URL = process.env.SECRET_SERVICE_URL
const SECRET_KEY = process.env.SECRET_SERVICE_KEY

if (!BASE_URL || !SECRET_KEY) {
  throw new Error('Missing required environment variables')
}

async function getFileList () {
  const response = await fetch(`${BASE_URL}/files`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SECRET_KEY}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch files')
  }

  return await response.json()
}

async function getFileByName (filename) {
  const response = await fetch(`${BASE_URL}/file/${filename}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SECRET_KEY}`
    }
  })

  if (!response.ok) {
    return null
  }

  return await response.text()
}

module.exports = {
  getFileList,
  getFileByName
}
