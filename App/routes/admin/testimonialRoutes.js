let express = require("express")
const multer = require("multer");
const { testimonialInsert, testimonialView, testimonialDelete } = require("../../controllers/admin/testimonialController");

let testimonialRoute = express.Router()

let myStorage = multer.diskStorage({
    destination: 'uploads/testimonial',
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const uploads = multer({ storage: myStorage });

testimonialRoute.post('/insert', uploads.single('testimonialImage'), testimonialInsert)
testimonialRoute.get('/view', testimonialView)
testimonialRoute.post('/delete', testimonialDelete)

module.exports = { testimonialRoute }