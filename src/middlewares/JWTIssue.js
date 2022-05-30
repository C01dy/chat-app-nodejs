const jwt = require('jsonwebtoken')

const JWTIssue = (req, res, next) => {
  const { authorization } = req.headers

  if (authorization) {
    const [tokenType, token] = authorization.split(' ')
    const { expiresIn, data: userId, iat } = jwt.verify(token, 'verysecretkey')

    next()
  } else {
    res.status(403).json({
      message: 'Not authorized',
    })
  }
}

module.exports = JWTIssue
