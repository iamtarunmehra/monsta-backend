let express = require("express")
const { adminLogin, changePassword } = require("../../controllers/admin/adminAuthController")

let adminAuthRoute = express.Router()

adminAuthRoute.post('/login', adminLogin)

adminAuthRoute.post('/change-password/:adminId', changePassword)

module.exports = { adminAuthRoute }