import { useSelector, useDispatch } from 'react-redux'

import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'

import { useGetFilesListQuery } from '../api/api.js'
import { fileSelectors, fileActions } from '../store/slices/file/file.index.js'
import { useCallback, useEffect } from 'react'

const FileList = () => {
  const { data, isLoading, error } = useGetFilesListQuery()

  const dispatch = useDispatch()
  const currentFileName = useSelector(fileSelectors.selectCurrentFileName)

  const handleFileClick = useCallback(
    fileName => {
      dispatch(fileActions.updateCurrentFileName(fileName))
    },
    [dispatch],
  )

  useEffect(() => {
    if (!data?.files) return

    if (data.files.length > 0 && !currentFileName) {
      dispatch(fileActions.updateCurrentFileName(data.files[0]))
    }
  }, [currentFileName, data, dispatch])

  if (isLoading) {
    return (
      <div className="spinner">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="spinner">
        <h5>Error on get files list</h5>
        <h6>{error.message}</h6>
      </div>
    )
  }

  return (
    <>
      <p>Select a file to see its lines.</p>
      <ListGroup>
        {data?.files?.map((fileName, idx) => (
          <ListGroup.Item
            key={idx}
            active={currentFileName === fileName}
            onClick={() => handleFileClick(fileName)}
          >
            <div className="item">
              <span>{fileName}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default FileList
