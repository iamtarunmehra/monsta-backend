let express = require("express")
const multer = require("multer")

const { subSubCategoryInsert, getParentCategory, getSubCategory, subSubCategoryView } = require("../../controllers/admin/subSubCategoryController");

let subSubCategoryRoutes = express.Router()

const myStorage = multer.diskStorage({
    destination: 'uploads/subSubCategory',
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})


const uploads = multer({ storage: myStorage })

subSubCategoryRoutes.post('/insert', uploads.single('subSubCategoryImage'), subSubCategoryInsert)

subSubCategoryRoutes.get('/parent-category', getParentCategory)

subSubCategoryRoutes.get('/sub-category/:id', getSubCategory)

subSubCategoryRoutes.get('/view', subSubCategoryView)


module.exports = { subSubCategoryRoutes }
