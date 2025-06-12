const { adminLogin } = require('../Controller/adminloginController')
const { createUser, employeeList, profile } = require('../Controller/authController')

const express = require ('express')
const employeeLogin = require('../Controller/employeeloginController')

const router = express.Router()


router.route('/').post(createUser)
router.route('/adminlogin').post(adminLogin)
router.route('/employeelogin').post(employeeLogin)
router.route('/list').get(employeeList)
router.route('/profile/:id').get(profile)





module.exports = router;