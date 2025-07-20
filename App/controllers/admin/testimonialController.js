const { testimonialModel } = require("../../models/testimonialModel")

let testimonialInsert = async (req, res) => {
    let allData = { ...req.body }
    if (req.file) {
        if (req.file !== undefined && req.file != null && req.file != '') {
            allData['testimonialImage'] = req.file.filename;
        }
    }
    console.log(allData)


    let testimonial = new testimonialModel(allData)
    let testimonialRes = await testimonial.save()
    res.send({
        status: 1,
        msg: "testimonial Data",
        testimonialRes
    })
}

let testimonialView = async (req, res) => {
    let testimonialData = await testimonialModel.find()
    console.log(testimonialData)
    let staticPath = process.env.STATICPATH + '/uploads/testimonial/'
    res.send({
        status: 1,
        staticPath,
        msg: "testimonial data",
        testimonialData
    })
}

let testimonialDelete = async (req, res) => {
    let { ids } = req.body
    let testRes = await testimonialModel.deleteMany({ _id: { $in: ids } })
    res.send({
        status: 1,
        msg: 'deleted',
        testRes
    })
}

module.exports = { testimonialInsert, testimonialView,testimonialDelete }