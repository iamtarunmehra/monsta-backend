const { categoryModel } = require("../../models/categoryModel")
const { subCategoryModel } = require("../../models/subCategoryModel")
const { subSubCategoryModel } = require("../../models/subSubCategoryModel")
const path = require("path")

let subSubCategoryInsert = async (req, res) => {
    let { category, subCategory, subSubCategoryName, subSubCategoryOrder, subSubCategoryImage } = req.body
    let obj = {
        parentCategory: category,
        subCategory: subCategory,
        subSubCategoryName,
        subSubCategoryOrder,
        subSubCategoryStatus: true,
        subSubCategoryImage
    };
    if (req.file) {
        console.log(req.file.filename)
        if (
            req.file.filename != undefined &&
            req.file.filename != null &&
            req.file.filename != ""
        ) {
            obj["subSubCategoryImage"] = req.file.filename;
        }
    }
    console.log(category)
    let subSubCategory = subSubCategoryModel(obj)
    let subSubCategoryRes = await subSubCategory.save()
    res.send({
        status: 1,
        msg: "sub sub category data",
        subSubCategoryRes
    })
}

let subSubCategoryView = async (req, res) => {
    let staticPath = process.env.STATICPATH + '/uploads/subSubCategory/'
    let subSubCategoryRes = await subSubCategoryModel.find().populate([{ path: 'parentCategory', select: 'categoryName' }, { path: 'subCategory', select: 'subCategoryName' }])

    res.send({
        status: 1,
        staticPath,
        msg: "subsubCategory data",
        subSubCategoryRes
    })
}

let getParentCategory = async (req, res) => {
    let categoryList = await categoryModel.find().select('categoryName')
    res.send(categoryList)
}

let getSubCategory = async (req, res) => {
    let { id } = req.params;
    let subCategoryList = await subCategoryModel.find({ subCategoryStatus: true, parentCategory: id })
    res.send(subCategoryList)
}

module.exports = { subSubCategoryInsert, getParentCategory, getSubCategory, subSubCategoryView }