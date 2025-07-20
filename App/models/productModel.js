const { default: mongoose, Schema } = require("mongoose");

let productSchema = new Schema({
    productName: ({
        type: String,
        required: true,
    }),
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subCategory' },
    subSubCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subSubCategory' },
    productColorName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'color' }],
    productMaterialName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'material' }],
    productType: ({
        type: Number,
        enum: [1, 2, 3]
    }),
    ProductBestSelling: Boolean,
    ProductTopRated: Boolean,
    ProductUpsell: Boolean,
    ProductActualPrice: Number,
    ProductSalePrice: Number,
    ProductTotalInStock: Number,
    productOrder: Number,
    productImage: String,
    productBackImage: String,
    productGalleryImage: Object,
    productDescription: String
},
    { timestamps: true });

let productModel = mongoose.model('product', productSchema)

module.exports = { productModel }