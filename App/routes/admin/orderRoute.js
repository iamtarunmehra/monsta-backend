let express = require('express')
const { viewOrder, orderDetail } = require('../../controllers/admin/orderController')

let orderRoute = express.Router()

orderRoute.get('/view', viewOrder)
orderRoute.post('/order-detail/:id', orderDetail)


module.exports = { orderRoute }