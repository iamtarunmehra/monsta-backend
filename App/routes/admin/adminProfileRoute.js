let express = require("express")
const { profileInsert, profileView } = require("../../controllers/admin/adminProfileController")
const multer = require("multer")

adminProfileRoute = express.Router()

const myStorage = multer.diskStorage({
    destination: 'uploads/profile',
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: myStorage })

adminProfileRoute.post('/insert', upload.single('profileImage'), profileInsert)
adminProfileRoute.get('/view', profileView)


module.exports = { adminProfileRoute }