function errorHandler (err, _req, res, _next) {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
}

module.exports = errorHandler
