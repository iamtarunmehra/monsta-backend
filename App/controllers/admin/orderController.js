const { orderModel } = require("../../models/orderModel")

let viewOrder = async (req, res) => {
    let order = await orderModel.find()
    res.send({
        status: 1,
        msg: "order details",
        order
    })
}

let orderDetail = async (req, res) => {
    let { id } = req.params;
    let orderRes = await orderModel.findOne({ _id: id })
    let { orderAmount, billingAddress } = orderRes
    let staticPath = process.env.STATICPATH + process.env.PORT + "/uploads/products/";
    res.send({
        status: 1,
        orderAmount,
        billingAddress,
        staticPath,
        msg: "specific order detail",
        orderRes
    })
    console.log(orderRes)
}

module.exports = { viewOrder, orderDetail }