const express = require('express')
const router = express.Router()
const {searchUser, createUser} = require('../controller/auth')

router.route('/create').post(createUser)
router.route('/').get(searchUser)

module.exports = router
