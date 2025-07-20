let express = require("express")
const { colorView, colorInsert, colorDelete, editColor, colorUpdate, colorChangeStatus } = require("../../controllers/admin/colorController")

let colorRoutes = express.Router()

colorRoutes.post('/insert', colorInsert)
colorRoutes.get('/view', colorView)
colorRoutes.post('/delete', colorDelete)
colorRoutes.get('/edit-row-data/:id', editColor)
colorRoutes.put('/update/:id', colorUpdate)
colorRoutes.put('/change-status/:id', colorChangeStatus)

module.exports = { colorRoutes }