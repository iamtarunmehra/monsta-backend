const { faqModel } = require("../../models/faqModel")

let faqInsert = async (req, res) => {
    let { question, answer, order } = req.body
    let obj = {
        question,
        answer,
        order,
        faqStatus: true
    }
    let faq = faqModel(obj)
    let faqRes = await faq.save()
    res.send({
        status: 1,
        msg: "faq inserted",
        faqRes
    })
}

let faqView = async (req, res) => {
    let faqRes = await faqModel.find()
    console.log(faqRes)
    res.send({
        status: 1,
        msg: "faq data",
        faqRes
    })
}

let faqDelete = async (req, res) => {
    let { ids } = req.body
    let deleteRes = await faqModel.deleteMany({ _id: { $in: ids } })
    res.send({
        status: 1,
        msg: "faq deleted",
        deleteRes
    })
}

let faqChangeStatus = async (req, res) => {
    let { id } = req.params;
    let { status } = req.body;
    let updateStatus = await faqModel.updateOne({ _id: id }, { $set: { faqStatus: status } })
    res.send({
        status: 1,
        updateStatus
    })
}

let faqEditRowData = async (req, res) => {
    let { id } = req.params;
    let faqRes = await faqModel.findOne({ _id: id });
    res.send({
        status: 1,
        msg: "faq data",
        faqRes,
    });
};

module.exports = { faqInsert, faqView, faqDelete, faqChangeStatus, faqEditRowData }