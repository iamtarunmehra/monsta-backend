const { sliderModel } = require("../../models/sliderModel")

let sliderInsert = async (req, res) => {

    let { sliderName, sliderOrder } = req.body
    let obj = {
        sliderName,
        sliderOrder,
        sliderStatus: true,
    }
    if (req.file) {
        if (
            req.file.filename != undefined &&
            req.file.filename != null &&
            req.file.filename != ""
        ) {
            obj["sliderImage"] = req.file.filename;
        }
    }
    
    try {
        let slider = sliderModel(obj)
        let sliderRes = await slider.save()
        res.send({
            status: 1,
            msg: "slider saved",
            sliderRes
        })
    }

    catch (error) {
        res.send({
            status: 0,
            msg: "slider Name is already exist",
            error
        });
    }
}


let sliderView = async (req, res) => {
    let staticPath = process.env.STATICPATH  + '/uploads/slider/'
    let sliderData = await sliderModel.find()
    res.send({
        status: 1,
        staticPath,
        msg: "slider data",
        sliderData
    })
}

let sliderDelete = async (req, res) => {
    let { ids } = req.body
    let deleteRes = await sliderModel.deleteMany({ _id: { $in: ids } })
    res.send({
        status: 1,
        msg: "slider delete",
        deleteRes
    })
}

let changeSliderStatus = async (req, res) => {
    let { id } = req.params;
    let { status } = req.body
    let changeStatus = await sliderModel.updateOne({ _id: id }, { $set: { sliderStatus: status } })
    res.send({
        status: 1,
        msg: "slider status changed",
        changeStatus
    })
}

let sliderEdit = async (req, res) => {
    let staticPath = process.env.STATICPATH + '/uploads/slider/'
    let { id } = req.params
    let sliderRes = await sliderModel.findOne({ _id: id })
    res.send({
        status: 1,
        staticPath,
        msg: "slider row data",
        sliderRes
    })
}

let sliderUpdate = async (req, res) => {
    let { id } = req.params
    let staticPath = process.env.STATICPATH  + '/uploads/slider/'
    let { sliderName, sliderOrder } = req.body
    let obj = {
        sliderName,
        sliderOrder,
        sliderStatus: true,
    }
    if (req.file) {
        if (
            req.file.filename != undefined &&
            req.file.filename != null &&
            req.file.filename != ""
        ) {
            obj["sliderImage"] = req.file.filename;
        }
    }
    try {
        let slider = await sliderModel.updateOne({ _id: id }, { $set: obj })
        res.send({
            status: 1,
            staticPath,
            msg: "slider details updated",
            slider
        })
    }
    catch (error) {
        res.send({
            status: 1,
            msg: "slider Name is Already exist",
            error
        })
    }

}

module.exports = { sliderInsert, sliderView, sliderDelete, changeSliderStatus, sliderEdit, sliderUpdate }