let express = require('express')
const { companyProfileInsert, companyProfileView } = require('../../controllers/admin/companyProfileController')
const multer = require('multer')

let companyProfileRoute = express.Router()

let myStorage = multer.diskStorage({
    destination: 'uploads/company-profile',
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: myStorage })

companyProfileRoute.post('/insert', upload.single('companyImage'), companyProfileInsert)
companyProfileRoute.get('/view', companyProfileView)


module.exports = { companyProfileRoute }