let express = require("express")
const { getParentCategory, getSubCategory, getSubSubCategory, getMaterial, getColor, productInsert, productView } = require("../../controllers/admin/productController")
const multer = require("multer")

let productRoute = express.Router()

const myStorage = multer.diskStorage({
    destination: "uploads/products",
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const uploads = multer({ storage: myStorage })

productRoute.get('/parent-category', getParentCategory)

productRoute.get('/sub-category/:id', getSubCategory)

productRoute.get('/sub-sub-category/:pid', getSubSubCategory)

productRoute.get('/material', getMaterial)

productRoute.get('/color', getColor)

productRoute.post('/insert', uploads.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'productBackImage', maxCount: 1 },
    { name: 'productGalleryImage', maxCount: 10 }
]), productInsert);

productRoute.get('/view', productView)


module.exports = { productRoute }