const { Router } = require('express')
const { getContacts } = require('../../controller/controller.user')
const router = Router()

router.get('/contacts', getContacts)

module.exports = router
