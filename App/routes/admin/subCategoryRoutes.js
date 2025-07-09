let express = require("express")
const { parentCategory, subCategoryInsert, subCategoryView, deleteSubCategory } = require("../../controllers/admin/subCategoryController");
const multer = require("multer");

let subCategoryRoutes = express.Router()

const myStorage = multer.diskStorage({
    destination: "uploads/subCategory",
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const uploads = multer({ storage: myStorage });

subCategoryRoutes.get('/parent-category', parentCategory)

subCategoryRoutes.get('/view', subCategoryView)

subCategoryRoutes.post('/delete', deleteSubCategory)


subCategoryRoutes.post('/insert', uploads.single('subCategoryImage'), subCategoryInsert)


module.exports = { subCategoryRoutes }