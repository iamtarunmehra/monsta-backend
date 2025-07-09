let express = require("express")
let multer = require("multer")
const { userCreate, userLogin, checkOtp, checkEmail, newOtpCheck, resetPassword, changePassword, userCreateWithGoogle } = require("../../controllers/web/userController")
const { checkToken } = require("../../middleware/website/checkToken")

let userCreateRoute = express.Router()

let uploads = multer({ storage: '' })

userCreateRoute.post('/create', uploads.none(), userCreate)

userCreateRoute.post('/check-otp', uploads.none(), checkOtp)

userCreateRoute.post('/login', userLogin)

userCreateRoute.post('/check-email', checkEmail,)

userCreateRoute.post('/new-otp-check', newOtpCheck)

userCreateRoute.put('/reset-password', resetPassword)

userCreateRoute.put('/change-password', checkToken, changePassword)

userCreateRoute.post('/create-with-google', userCreateWithGoogle)


module.exports = { userCreateRoute };