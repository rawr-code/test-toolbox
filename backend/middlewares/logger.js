function logger (req, _res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
}

module.exports = logger
