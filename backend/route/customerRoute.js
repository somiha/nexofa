const router = require('express').Router()
const { addCustomer, getAllCustomer } = require('../controller/customerController')
const auth = require('../middleware/auth')

router.post('/add-customer', auth, addCustomer)
router.get('/', auth, getAllCustomer)

module.exports = router