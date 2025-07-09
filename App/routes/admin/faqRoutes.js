let express = require("express")
const { faqInsert, faqView, faqDelete, faqChangeStatus, faqEditRowData } = require("../../controllers/admin/faqController")

let faqRoutes = express.Router()

faqRoutes.post('/insert', faqInsert)

faqRoutes.get('/view', faqView)

faqRoutes.post('/delete', faqDelete)

faqRoutes.put('/change-status/:id', faqChangeStatus)

faqRoutes.get('/edit-row-data/:id', faqEditRowData)

module.exports = { faqRoutes }