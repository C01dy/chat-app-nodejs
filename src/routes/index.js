const { Router } = require('express')
const JWTIssue = require('../middlewares/JWTIssue')
const router = Router()
const auth = require('./auth')
const user = require('./user')

router.use('/auth', auth)
router.use('/user', JWTIssue, user)

module.exports = router
