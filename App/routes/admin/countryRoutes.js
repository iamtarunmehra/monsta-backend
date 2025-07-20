let express = require("express")

const { countryInsert, countryView, countryDelete } = require("../../controllers/admin/countryController")


let countryRoutes = express.Router()

countryRoutes.post('/insert', countryInsert)

countryRoutes.get('/view', countryView)

countryRoutes.post('/delete', countryDelete)

module.exports = { countryRoutes }