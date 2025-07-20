let express = require("express")
const { materialInsert, materialView, materialDelete, materialChangeStatus } = require("../../controllers/admin/materialController")

let materialRoute = express.Router()

materialRoute.post('/insert', materialInsert)
materialRoute.get('/view', materialView)
materialRoute.post('/delete', materialDelete)
materialRoute.put('/change-status/:id', materialChangeStatus)

module.exports = { materialRoute }