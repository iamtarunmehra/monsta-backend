let express = require("express")
const { whyChooseUsInsert, whyChooseUsView } = require("../../controllers/admin/whyChooseUsController")

let whyChooseUsRoute = express.Router()

whyChooseUsRoute.post('/insert',whyChooseUsInsert)

whyChooseUsRoute.get('/view',whyChooseUsView)

module.exports={whyChooseUsRoute}