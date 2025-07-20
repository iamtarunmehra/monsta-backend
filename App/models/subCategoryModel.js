const { Schema, default: mongoose } = require("mongoose");

let subCategorySchema = new Schema({
    subCategoryName: ({
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true
    }),
    subCategoryImage: String,
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    subCategoryStatus: Boolean,
    subCategoryOrder: Number
}, { timestamps: true })

let subCategoryModel = mongoose.model("subCategory", subCategorySchema)

module.exports = { subCategoryModel }