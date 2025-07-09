const { countryModel } = require("../../models/countryModel")

let countryInsert = async (req, res) => {
    let { countryName, countryOrder } = req.body
    let obj = {
        countryName,
        countryOrder,
        countryStatus: true
    }
    let country = countryModel(obj)
    let countryRes = await country.save()
    res.send({
        status: 1,
        msg: "country saved",
        countryRes
    })
}

let countryView = async (req, res) => {
    let countryData = await countryModel.find()
    res.send({
        status: 1,
        msg: "country saved",
        countryData
    })
}

let countryDelete = async (req, res) => {
    let { ids } = req.body
    let deleteRes = await countryModel.deleteMany({ _id: { $in: ids } })
    res.send({
        status: 1,
        msg: "country deleted",
        deleteRes
    })
}
module.exports = { countryInsert, countryView, countryDelete }
