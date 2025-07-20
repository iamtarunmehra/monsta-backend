const { cartModel } = require("../../models/cartModel");
const { orderModel } = require("../../models/orderModel");
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

let addToCart = async (req, res) => {
    try {
        let { color, product, id } = req.body;
        let obj = {
            productColorName: color,
            userId: id,
            quantity: 1,
            product,
        };
        let cart = new cartModel(obj);
        let cartRes = await cart.save();

        let resObj = {
            status: 1,
            msg: "Product Added to cart",
            cartRes,
        };
        res.send(resObj);
    } catch (error) {
        let obj = {
            status: 0,
            msg: "Product doesn't added in cart try again later",
            error,
        };
        res.send(obj);
    }
};

let viewCart = async (req, res) => {
    let cartRes = await cartModel
        .find()
        .populate("productColorName", "colorName");

    let staticPath =
        process.env.STATICPATH + process.env.PORT + "/uploads/products/";
    res.send({
        status: 1,
        staticPath,
        msg: "cart data",
        cartRes,
    });
};

let updateCart = async (req, res) => {
    let updates = req.body.updates; // [{id, quantity}, {id, quantity}, ...]

    const updatePromises = updates.map(({ id, quantity }) =>
        cartModel.updateOne({ _id: id }, { $set: { quantity: quantity } })
    );

    const results = await Promise.all(updatePromises);
    if (updatePromises) {
        res.send({
            status: 1,
            msg: "Cart updated successfully",
            results,
        });
    } else {
        res.send({
            status: 0,
            msg: "Failed to update cart",
            error: error.message,
        });
    }
};

// let removeCart = async (req, res) => {
//     let { id } = req.params;
//     for (let v in cartModel.product) {
//         console.log(v)
//     }
//     res.send("hello")
// }

let orderSave = async (req, res) => {

    let previousObj = { ...req.body }
    let { billingAddress, orderItems, orderQuantity, paymentMethod, totalAmount, totalQty, id } = previousObj

    let obj = {
        billingAddress,
        orderItems,
        orderQuantity,
        paymentMethod,
        orderAmount: totalAmount,
        orderUser: id
    }


    let resObj;
    if (previousObj.paymentMethod == '1') {
        obj["paymentStatus"] = "2", obj["orderStatus"] = "process"
        let addOrder = new orderModel(obj);
        let orderRes = await addOrder.save();
        await cartModel.deleteMany({ userId: id })
        resObj = {
            status: 1,
            msg: "Order Placed",
            orderRes
        }
    } else {
        //Online payment

        //db order create

        obj["paymentStatus"] = "2", obj["orderStatus"] = "process"
        let addOrder = new orderModel(obj);
        let orderRes = await addOrder.save();

        //razorpay order create
        const razorpayOrder = await razorpay.orders.create({
            amount: totalAmount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: orderRes._id,
        });

        // console.log(razorpayOrder)

        await orderModel.updateOne({ _id: orderRes._id }, { $set: { razorpayOrderId: razorpayOrder.id } })

        resObj = {
            status: 2,
            msg: "Order Placed with online payment",
            orderRes,
        }
        return res.send(razorpayOrder)
    }
    return res.send(resObj)
};

let orderView = async (req, res) => {
    let orderDetails = await orderModel.find()
    res.send({
        status: 1,
        msg: "order details",
        orderDetails
    })
}

module.exports = { addToCart, viewCart, updateCart, orderSave, orderView };
