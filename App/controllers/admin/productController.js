const { categoryModel } = require("../../models/categoryModel")
const { colorModel } = require("../../models/colorModel")
const { materialModel } = require("../../models/materialModel")
const { productModel } = require("../../models/productModel")
const { subCategoryModel } = require("../../models/subCategoryModel")
const { subSubCategoryModel } = require("../../models/subSubCategoryModel")

let productInsert = async (req, res) => {
    let allData = { ...req.body }
    if (req.files.productImage) {
        allData['productImage'] = req.files.productImage[0].filename
    }
    if (req.files.productBackImage) {
        allData['productBackImage'] = req.files.productBackImage[0].filename
    }
    if (req.files.productGalleryImage) {
        allData['productGalleryImage'] = req.files.productGalleryImage.map((items) => items.filename)

    }
    try {
        let product = await productModel.insertOne(allData)
        let productRes = await product.save()
        res.send({
            status: 1,
            msg: "Product Data",
            productRes
        })
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "Product Name is already exist",
            error
        })
    }
}

let productView = async (req, res) => {
    let productData = await productModel.find()
    res.send({
        status: 1,
        msg: "product Data",
        productData
    })
}

let getParentCategory = async (req, res) => {
    let categoryList = await categoryModel.find().select('categoryName')
    res.send({
        status: 1,
        categoryList
    })
}

let getSubCategory = async (req, res) => {
    let { id } = req.params;
    let subCategoryList = await subCategoryModel.find({ subCategoryStatus: true, parentCategory: id })
    res.send({
        status: 1,
        subCategoryList
    })
}

let getSubSubCategory = async (req, res) => {
    let { pid } = req.params
    let subSubCategoryList = await subSubCategoryModel.find({ subSubCategoryStatus: true, subCategory: pid })
    res.send({
        status: 1,
        subSubCategoryList
    })
}

let getMaterial = async (req, res) => {
    let materialRes = await materialModel.find({ materialStatus: true }).select('materialName')
    res.send({
        status: 1,
        materialRes
    })
}

let getColor = async (req, res) => {
    let colorRes = await colorModel.find({ colorStatus: true }).select('colorName')
    res.send({
        status: 1,
        colorRes
    })
}

module.exports = { getParentCategory, getSubCategory, getSubSubCategory, getMaterial, getColor, productInsert, productView }