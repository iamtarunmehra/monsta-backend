let express = require("express");

const { colorRoutes } = require("./colorRoutes");
const { materialRoute } = require("./materialRoutes");
const { whyChooseUsRoute } = require("./whyChooseUsRoutes");
const { sliderRoute } = require("./sliderRoutes");
const { categoryRoutes } = require("./categoryRoutes");
const { subCategoryRoutes } = require("./subCategoryRoutes");
const { faqRoutes } = require("./faqRoutes");
const { countryRoutes } = require("./countryRoutes");
const { subSubCategoryRoutes } = require("./subSubCategoryRoutes");
const { adminAuthRoute } = require("./adminAuthRoutes");
const { productRoute } = require("./productRoute");
const { testimonialRoute } = require("./testimonialRoutes");
const { orderRoute } = require("./orderRoute");
const { adminProfileRoute } = require("./adminProfileRoute");
const { companyProfileRoute } = require("./companyProfileRoute");

let adminRoutes = express.Router();

adminRoutes.use("/auth", adminAuthRoute);

adminRoutes.use("/color", colorRoutes);
adminRoutes.use("/material", materialRoute);
adminRoutes.use("/why-choose-us", whyChooseUsRoute);
adminRoutes.use("/slider", sliderRoute);
adminRoutes.use("/country", countryRoutes);
adminRoutes.use("/testimonial", testimonialRoute);
adminRoutes.use("/category", categoryRoutes);
adminRoutes.use("/sub-category", subCategoryRoutes);
adminRoutes.use("/faq", faqRoutes);
adminRoutes.use("/sub-sub-category", subSubCategoryRoutes);
adminRoutes.use("/product", productRoute);
adminRoutes.use("/order", orderRoute);
adminRoutes.use("/profile", adminProfileRoute);
adminRoutes.use("/company-profile", companyProfileRoute);





module.exports = { adminRoutes };   
