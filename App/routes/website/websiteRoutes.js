let express = require("express")
const { userCreateRoute } = require("./userCreate")
const { getProductRoute } = require("./homePageRoute")
const { cartRoute } = require("./cartRoute")

let websiteRoute = express.Router()

websiteRoute.use('/user', userCreateRoute)
websiteRoute.use('/home-page', getProductRoute)
websiteRoute.use('/cart', cartRoute)


module.exports = { websiteRoute }