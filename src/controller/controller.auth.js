const UserService = require('../services/service.user')
const AuthService = require('../services/service.auth')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

const setRefresh = (token, userId, callback) => {
  const newRefreshToken = uuidv4()
  AuthService.setRefreshToken(token, userId, (error, _) => {
    if (error) {
      callback(error)
      return
    }

    callback(null, {
      token: jwt.sign(
        {
          // exp: 60000,
          data: userId,
        },
        'verysecretkey'
      ),
      refreshToken: newRefreshToken,
    })
  })
}

const auth = (req, res) => {
  const { login, password } = req.body

  UserService.findByLogin(login, (error, user) => {
    if (error) {
      throw new Error(error)
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(403).json({
        message: 'Incorrect login or password',
      })
      return
    }

    const refreshToken = uuidv4()
    AuthService.setRefreshToken(refreshToken, user.id, (error, _) => {
      if (error) {
        throw new Error(error)
      }

      res.status(200).json({
        token: jwt.sign(
          {
            // exp: 60000,
            expiresIn: '1m',
            userId: user.id,
          },
          'verysecretkey'
        ),
        refreshToken: refreshToken,
      })
    })
  })
}

const refreshToken = (req, res) => {
  AuthService.getRefreshToken(req.body.refreshToken, (error, dbToken) => {
    if (error) console.error(error)
    if (!dbToken) return
    const newRefreshToken = uuidv4()
    AuthService.setRefreshToken(
      req.body.refreshToken,
      dbToken.userId,
      (error, _) => {
        if (error) {
          throw new Error(error)
        }

        res.status(200).json({
          token: jwt.sign(
            {
              // exp: 60000,
              data: dbToken.userId,
            },
            'verysecretkey'
          ),
          refreshToken: newRefreshToken,
        })
      }
    )
  })
}

module.exports = { auth, refreshToken }
