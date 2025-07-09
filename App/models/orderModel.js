const { Schema, default: mongoose } = require("mongoose");

let orderSchema = new Schema({
    orderItems: [],
    billingAddress: Object,
    paymentMethod: {
        type: String,
        enum: ["1", "2"],
        default: "1"
    },
    paymentStatus: {
        type: String,
        enum: ["1", "2", "3"],
        default: 1
    },
    razorpayOrderId: {
        type: String
    },
    razorpayPayment: {
        type: String
    },
    razorpayAmount: {
        type: String
    },
    orderQuantity: {
        type: String
    },
    orderAmount: {
        type: Number
    },
    shippingCharges: {
        type: Number
    },
    orderStatus: {
        type: String,
        enum: ["pending", "process", "completed"],
        default: "pending"
    },
    orderUser: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    }

})

let orderModel = mongoose.model('order', orderSchema)

module.exports = { orderModel }