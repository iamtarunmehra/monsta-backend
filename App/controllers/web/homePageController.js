const { categoryModel } = require("../../models/categoryModel");
const { companyProfileModel } = require("../../models/companyProfileModel");
const { productModel } = require("../../models/productModel");
const { sliderModel } = require("../../models/sliderModel");
const { subCategoryModel } = require("../../models/subCategoryModel");
const { subSubCategoryModel } = require("../../models/subSubCategoryModel");
const { testimonialModel } = require("../../models/testimonialModel");

let getSlider = async (req, res) => {
    let sliderRes = await sliderModel.find();
    let staticPath =
        process.env.STATICPATH  + "/uploads/slider/";
    res.send({
        status: 1,
        staticPath,
        msg: "slider Data",
        sliderRes,
    });
};

let bestSellingProducts = async (req, res) => {
    let bestSellingRes = await productModel
        .find({ ProductBestSelling: true })
        .populate({ path: "productColorName", select: "colorName" })
        .populate({ path: "productMaterialName", select: "materialName" })
        .populate({ path: "parentCategory", select: "categoryName" })
        .select([
            "productName",
            "parentCategory",
            "productMaterialName",
            "productColorName",
            "ProductActualPrice",
            "ProductSalePrice",
            "productImage",
        ]);
    let staticPath =
        process.env.STATICPATH +  "/uploads/products/";
    res.send({
        status: 1,
        staticPath,
        msg: "product best selling data",
        bestSellingRes,
    });
};

let featureItems = async (req, res) => {
    let staticPath =
        process.env.STATICPATH +  "/uploads/products/";
    let featureRes = await productModel.find({ productType: 1 })
        .populate({ path: "parentCategory", select: "categoryName" })
        .populate({ path: "productColorName", select: "colorName" })
        .select([
            "productName",
            "productColorName",
            "ProductActualPrice",
            "ProductSalePrice",
            "productImage",
            "productBackImage",
            "productGalleryImage",
            "productDescription",
        ]);
    res.send({
        status: 1,
        staticPath,
        msg: "feature product data",
        featureRes,
    });
};

let newArrivals = async (req, res) => {
    let staticPath =
        process.env.STATICPATH  + "/uploads/products/";
    let newArrivalsRes = await productModel
        .find({ productType: 2 })
        .populate({ path: "parentCategory", select: "categoryName" })
        .populate({ path: "productColorName", select: "colorName" })
        .select([
            "productName",
            "productColorName",
            "ProductActualPrice",
            "ProductSalePrice",
            "productImage",
            "productBackImage",
            "productGalleryImage",
            "productDescription",
        ]);
    res.send({
        status: 1,
        staticPath,
        msg: "new arrivals product data",
        newArrivalsRes,
    });
}

let onsale = async (req, res) => {
    let staticPath =
        process.env.STATICPATH + "/uploads/products/";
    let onsaleRes = await productModel
        .find({ productType: 3 })
        .populate({ path: "parentCategory", select: "categoryName" })
        .populate({ path: "productColorName", select: "colorName" })
        .select([
            "productName",
            "productColorName",
            "ProductActualPrice",
            "ProductSalePrice",
            "productImage",
            "productBackImage",
            "productGalleryImage",
            "productDescription",
        ]);
    res.send({
        status: 1,
        staticPath,
        msg: "onsale product data",
        onsaleRes,
    });
}

let topRatedProduct = async (req, res) => {
    let staticPath =
        process.env.STATICPATH + "/uploads/products/";
    let topRatedProductRes = await productModel
        .find({ ProductTopRated: true })
        .populate({ path: "parentCategory", select: "categoryName" })
        .populate({ path: "productColorName", select: "colorName" })
        .select([
            "productName",
            "productColorName",
            "ProductActualPrice",
            "ProductSalePrice",
            "productImage",
            "productBackImage",
            "productGalleryImage",
            "productDescription",
        ]);
    res.send({
        status: 1,
        staticPath,
        msg: "Top rated product data",
        topRatedProductRes,
    });
}


let megaMenu = async (req, res) => {
    let category = await categoryModel.find({ categoryStatus: true }).select('categoryName')
    let finalAns = [];
    let obj;
    for (let v of category) {
        obj = {
            categoryName: v.categoryName,
            id: v._id,
        }

        let subCategory = await subCategoryModel.find({ subCategoryStatus: true, parentCategory: v._id }).select('subCategoryName')

        let subCat = []

        for (let item of subCategory) {
            let subCatDataObj = {}
            let subCategory = await subSubCategoryModel.find({ subSubCategoryStatus: true, subCategory: item._id }).select('subSubCategoryName')

            subCatDataObj = {
                id: item._id,
                subCategoryName: item.subCategoryName,
                subCategoryData: subCategory
            }
            subCat.push(subCatDataObj)
            obj['subCategoryData'] = subCat

        }
        finalAns.push(obj)
    }
    res.send({
        status: 1,
        msg: 'All Category Data',
        finalAns
    })
}

let testimonialView = async (req, res) => {
    let testimonialRes = await testimonialModel.find()
    let staticPath = process.env.STATICPATH + '/uploads/testimonial/'
    res.send({
        status: 1,
        staticPath,
        msg: 'testimonial data',
        testimonialRes
    })
}

let showProduct = async (req, res) => {
    let { id } = req.params
    let productRes = await productModel.find({ _id: id })
    res.send({
        status: 1,
        msg: "product data",
        productRes
    })
}


let showCompanyProfile = async (req, res) => {
    let companyDetails = await companyProfileModel.find()
    let staticPath = process.env.STATICPATH + '/uploads/company-profile/'
    res.send({
        status: 1,
        staticPath,
        msg: 'company data',
        companyDetails
    })
}



module.exports = { getSlider, bestSellingProducts, featureItems, newArrivals, onsale, megaMenu, testimonialView, topRatedProduct, showProduct, showCompanyProfile };
