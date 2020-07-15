const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.header('Authorization')
  if(!token) return res.json({message: 'No token'})
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

module.exports = auth