let express = require("express")
let multer = require("multer")
const { sliderInsert, sliderView, sliderDelete, changeSliderStatus, sliderEdit, sliderUpdate } = require("../../controllers/admin/sliderController")

let sliderRoute = express.Router()

const myStorage = multer.diskStorage({
    destination: 'uploads/slider',
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const uploads = multer({ storage: myStorage })

sliderRoute.post('/insert', uploads.single('sliderImage'), sliderInsert)
sliderRoute.get('/view', sliderView)
sliderRoute.post('/delete', sliderDelete)
sliderRoute.put('/change-status/:id', changeSliderStatus)
sliderRoute.get('/edit-row-data/:id', sliderEdit)
sliderRoute.put('/update/:id', uploads.single("sliderImage"), sliderUpdate)

module.exports = { sliderRoute }