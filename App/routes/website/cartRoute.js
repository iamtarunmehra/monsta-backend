let express = require("express")
const { checkToken } = require("../../middleware/website/checkToken")
const { addToCart, viewCart, updateCart, orderSave, orderView, removeCart } = require("../../controllers/web/cartController")

let cartRoute = express.Router()

cartRoute.post('/add-to-cart', checkToken, addToCart)
cartRoute.post('/view-cart', checkToken, viewCart)
cartRoute.put('/update-cart', checkToken, updateCart)
cartRoute.post('/order-save', checkToken, orderSave)
cartRoute.get('/order-view', checkToken, orderView)
// cartRoute.put('/remove-cart/:id', checkToken, removeCart)



module.exports = { cartRoute }