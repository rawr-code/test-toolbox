import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'

import { useGetFilesQuery } from '../api/api.js'
import { fileSelectors } from '../store/slices/file/file.index.js'

const FileLinesTable = () => {
  const { data, isLoading, error } = useGetFilesQuery()

  const currentFileName = useSelector(fileSelectors.selectCurrentFileName)

  const currentFileLines = useMemo(() => {
    if (currentFileName && !!data?.length) {
      const fileInfo = data.find(file => file.fileName === currentFileName)
      return fileInfo?.lines
    }

    return []
  }, [currentFileName, data])

  if (isLoading) {
    return (
      <div className="spinner">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="spinner">
        <h5>Error fetching file lines</h5>
        <h6>{error.message}</h6>
      </div>
    )
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {currentFileLines?.length > 0 ? (
          currentFileLines.map((line, idx) => (
            <tr key={idx}>
              <td>{line.text}</td>
              <td>{line.number}</td>
              <td>{line.hex}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center p-5">
              <h5>No lines to display</h5>
              <h6>Please select another file</h6>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default FileLinesTable
