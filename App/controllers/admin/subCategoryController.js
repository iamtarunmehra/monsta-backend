const { categoryModel } = require("../../models/categoryModel");
const { subCategoryModel } = require("../../models/subCategoryModel");

let parentCategory = async (req, res) => {
    let categoryList = await categoryModel.find()
    res.send(categoryList)
}

let subCategoryInsert = async (req, res) => {
    let { subCategoryName, parentCategory, subCategoryOrder, subCategoryImage } = req.body;
    console.log(req.body);
    let obj = {
        subCategoryName,
        subCategoryOrder,
        parentCategory,
        subCategoryImage,
        subCategoryStatus: true,
    };

    if (req.file) {
        if (
            req.file.filename != undefined &&
            req.file.filename != null &&
            req.file.filename != ""
        ) {
            obj["subCategoryImage"] = req.file.filename;
        }
    }


    try {
        let subCategory = new subCategoryModel(obj);
        let subCategoryRes = await subCategory.save();
        res.send({
            status: 1,
            msg: "category saved",
            subCategoryRes,
        });
    } catch (err) {
        res.send({
            status: 0,
            msg: "Sub Category Name is already exist",
            err,
        });
    }
};

let subCategoryView = async (req, res) => {

    let staticPath = process.env.STATICPATH + '/uploads/subCategory/'

    let subCategoryRes = await subCategoryModel.find().populate('parentCategory');


    res.send({
        status: 1,
        staticPath,
        msg: "subcategory Data",
        subCategoryRes
    })
}

let deleteSubCategory = async (req, res) => {
    let { ids } = req.body
    let deleteRes = await subCategoryModel.deleteMany({ _id: { $in: ids } })
    res.send({
        status: 1,
        msg: "subcategory data deleted",
        deleteRes
    })
}

module.exports = { parentCategory, subCategoryInsert, subCategoryView, deleteSubCategory }