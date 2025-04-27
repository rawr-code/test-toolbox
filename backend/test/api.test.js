const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai

const { app } = require('../index.js')

chai.use(chaiHttp)

/**
 * Checks if a file name is valid
 * @param {string} fileName - Name of the file to validate
 * @returns {boolean} - true if the name is valid
 */
const isValidFileName = (fileName) =>
  typeof fileName === 'string' && fileName.endsWith('.csv')

/**
 * Checks if a line has the correct structure
 * @param {Object} line - Line to validate
 * @returns {boolean} - true if the line is valid
 */
const isValidLine = (line) => {
  if (!line || typeof line !== 'object') return false

  const requiredKeys = ['text', 'number', 'hex']
  const hasAllKeys = requiredKeys.every((key) => key in line)
  const hasOnlyRequiredKeys = Object.keys(line).length === requiredKeys.length

  return (
    hasAllKeys &&
    hasOnlyRequiredKeys &&
    typeof line.text === 'string' &&
    typeof line.number === 'number' &&
    typeof line.hex === 'string'
  )
}

/**
 * Checks if a file data object is valid
 * @param {Object} item - Object to validate
 * @returns {boolean} - true if the object is valid
 */
const isValidFileData = (item) => {
  if (!item || typeof item !== 'object') return false

  const hasValidFileName = 'fileName' in item && isValidFileName(item.fileName)
  const hasLinesProperty = 'lines' in item

  if (!hasValidFileName || !hasLinesProperty) return false

  return (
    item.lines === null ||
    (Array.isArray(item.lines) && item.lines.every((line) => isValidLine(line)))
  )
}

/**
 * Makes an HTTP request and handles common errors
 * @param {string} method - HTTP method (get, post, etc.)
 * @param {string} url - URL to make the request to
 * @param {Function} assertions - Function containing the assertions to perform
 * @returns {Function} - Function to use with mocha
 */
const makeRequest = (method, url, assertions) => {
  return function (done) {
    this.timeout(10000)

    chai
      .request(app)[method](url)
      .end(function (err, res) {
        try {
          if (err && !res) {
            return done(err)
          }

          assertions.call(this, res, done)
        } catch (error) {
          done(error)
        }
      })
  }
}

describe('File API', () => {
  describe('GET /api/files/list', () => {
    it(
      'should return an array with the file names',
      makeRequest('get', '/api/files/list', function (res, done) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('files').that.is.an('array')

        expect(res.body.files).to.satisfy(
          (files) => files.every((file) => isValidFileName(file)),
          'Some file names do not have the expected format'
        )

        expect(res.body.files).to.have.length.greaterThan(0)

        done()
      })
    )
  })

  describe('GET /api/files/data', () => {
    it(
      'should return an array of processed files',
      makeRequest('get', '/api/files/data', function (res, done) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('data').that.is.an('array')

        expect(res.body.data).to.satisfy(
          (dataArray) => dataArray.every((item) => isValidFileData(item)),
          'The response does not meet the expected data structure'
        )

        done()
      })
    )
  })

  describe('GET /api/files/data?fileName', () => {
    const EMPTY_FILE = 'test1.csv'
    const VALID_FILE = 'test2.csv'
    const INVALID_FILE = 'test4.csv'
    const NONEXISTENT_FILE = 'nonexistent_file.csv'

    it(
      'should return an object with empty lines for a file without valid data',
      makeRequest(
        'get',
        `/api/files/data?fileName=${EMPTY_FILE}`,
        function (res, done) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('fileName', EMPTY_FILE)
          // expect(res.body).to.have.property("lines").that.is.an("array").and.is
          //   .empty;
          expect(res.body).to.have.property('lines')
          expect(res.body.lines).to.be.an('array')
          expect(res.body.lines.length).to.equal(0)

          done()
        }
      )
    )

    it(
      'should return an object with valid lines for a file with data',
      makeRequest(
        'get',
        `/api/files/data?fileName=${VALID_FILE}`,
        function (res, done) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('fileName', VALID_FILE)
          expect(res.body).to.have.property('lines')
          expect(res.body.lines).to.be.an('array')
          expect(res.body.lines.length).to.be.greaterThan(0)

          // Verify that all lines have the correct structure
          expect(res.body.lines).to.satisfy(
            (lines) => lines.every((line) => isValidLine(line)),
            'The lines do not meet the expected structure'
          )

          // Verify the structure of the first line
          const firstLine = res.body.lines[0]
          expect(firstLine).to.have.all.keys('text', 'number', 'hex')
          expect(firstLine.text).to.be.a('string')
          expect(firstLine.number).to.be.a('number')
          expect(firstLine.hex).to.be.a('string')

          done()
        }
      )
    )

    it(
      'should return a 404 error for a file that cannot be processed',
      makeRequest(
        'get',
        `/api/files/data?fileName=${INVALID_FILE}`,
        function (res, done) {
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error').that.is.a('string')
          expect(res.body.error).to.include(INVALID_FILE)

          done()
        }
      )
    )

    it(
      'should return a 404 error for a nonexistent file',
      makeRequest(
        'get',
        `/api/files/data?fileName=${NONEXISTENT_FILE}`,
        function (res, done) {
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error').that.is.a('string')

          done()
        }
      )
    )
  })
})
