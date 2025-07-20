const { whyChooseUsModel } = require("../../models/whyChooseUsModel")

let whyChooseUsInsert = async (req, res) => {
    let obj = {
        whyChooseUsImage: "mehra",
        whyChooseUsName: "dummy",
        whyChooseUsOrder: 2,
        whyChooseUsDes: "hello my name is tarun"
    }
    let whyChooseUs = whyChooseUsModel(obj)
    let whyChooseUsRes = await whyChooseUs.save()
    res.send({
        status: 1,
        msg: "why choose us saved",
        whyChooseUsRes
    })
}

let whyChooseUsView = async (req, res) => {
    let whyChooseUsData = await whyChooseUsModel.find()
    res.send({
        status: 1,
        msg: "why choose us data",
        whyChooseUsData
    })
}

module.exports = { whyChooseUsInsert, whyChooseUsView }
