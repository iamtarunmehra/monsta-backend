const { default: mongoose } = require("mongoose");

let subSubCategorySchema = mongoose.Schema({
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subCategory' },
    subSubCategoryName: String,
    subSubCategoryOrder: Number,
    subSubCategoryStatus: Boolean,
    subSubCategoryImage: String
}, { timestamps: true })

let subSubCategoryModel = mongoose.model("subSubCategory", subSubCategorySchema)

module.exports = { subSubCategoryModel }