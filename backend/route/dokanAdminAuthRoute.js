const router = require('express').Router()
const { registerDokanAdmin, signInDokanAdmin, getUser } = require('../controller/dokanAdminAuthController')
const auth = require('../middleware/auth')

router.post('/register', registerDokanAdmin)
router.post('/signin', signInDokanAdmin)
router.get('/', auth, getUser)

module.exports = router