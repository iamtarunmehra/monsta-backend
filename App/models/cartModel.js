const { Schema, default: mongoose } = require("mongoose");

let cartSchema = new Schema({
    productColorName: { type: mongoose.Schema.Types.ObjectId, ref: 'color' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    quantity: Number,
    product: Object
})

let cartModel = mongoose.model('cart', cartSchema)

module.exports = { cartModel }