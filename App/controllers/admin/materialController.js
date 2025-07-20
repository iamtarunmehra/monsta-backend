const { default: mongoose } = require("mongoose")
const { materialModel } = require("../../models/materialModel")

let materialInsert = async (req, res) => {
    let { materialName, materialOrder } = req.body
    let obj = {
        materialName,
        materialStatus: true,
        materialOrder
    }

    let material = materialModel(obj)
    let materialRes = await material.save()
    res.send({
        status: 1,
        msg: "material data",
        materialRes
    })
}

let materialView = async (req, res) => {

    let materialData = await materialModel.find()
    res.send({
        status: 1,
        msg: "material saved",
        materialData
    })
}

let materialDelete = async (req, res) => {

    let { ids } = req.body
    let deleteRes = await materialModel.deleteMany({ _id: { $in: ids } })
    res.send({
        status: 1,
        msg: "material deleted",
        deleteRes
    })
}

let materialChangeStatus = async (req, res) => {
    let { id } = req.params
    let { status } = req.body
    let updateRes = await materialModel.updateOne({ _id: id }, { $set: { materialStatus: status } })
    res.send({
        status: 1,
        msg: "status changed",
        updateRes
    })
}
module.exports = { materialInsert, materialView, materialDelete, materialChangeStatus }