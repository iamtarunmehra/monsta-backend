let express = require("express")
const { bestSellingProducts, getSlider, featureItems, newArrivals, onsale, megaMenu, testimonialView, topRatedProduct, showProduct, showCompanyProfile } = require("../../controllers/web/homePageController")

let getProductRoute = express.Router()

getProductRoute.get('/best-selling', bestSellingProducts)

getProductRoute.get('/slider', getSlider)

getProductRoute.get('/feature-items', featureItems)

getProductRoute.get('/new-arrivals', newArrivals)

getProductRoute.get('/onsale', onsale)

getProductRoute.get('/mega-menu', megaMenu)

getProductRoute.get(`/testimonial-view`, testimonialView)

getProductRoute.get(`/top-rated`, topRatedProduct)

getProductRoute.get('/product-detail', showProduct)

getProductRoute.get('/company-profile', showCompanyProfile)




module.exports = { getProductRoute }