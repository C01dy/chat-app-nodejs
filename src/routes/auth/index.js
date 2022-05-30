const { Router } = require('express');
const { auth, refreshToken } = require('../../controller/controller.auth');
const { createUser } = require('../../controller/controller.user');
const router = Router();

router.post('/sign_up', createUser);
router.post('/sign_in', auth);
router.post('/resfresh', refreshToken);

module.exports = router;
