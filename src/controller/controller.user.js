const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const UserService = require('../services/service.user')

const createUser = (req, res) => {
  const { login, password, username } = req.body

  UserService.findByLogin(login, (error, candidate) => {
    if (error) {
      throw new Error(error)
    }

    if (candidate) {
      res.status(500).json({
        message: 'User with this login is exist',
      })
      return
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = {
      username,
      login,
      password: hashedPassword,
    }
    UserService.createUser(newUser, (error, user) => {
      if (error) {
        throw new Error(error)
      }
      res.status(200).json({
        data: user,
        message: 'User has been created',
      })
    })
  })
}

const getContacts = (req, res) => {
  console.log('req.userId >> ', req.userId)
  UserService.getContacts(ObjectId(req.userId), (error, contacts) => {
    if (error) {
      console.error(error)
    }

    res.status(200).json({ contacts })
  })
}

module.exports = {
  createUser,
  getContacts,
}
