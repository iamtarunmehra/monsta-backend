const { companyProfileModel } = require("../../models/companyProfileModel")

let companyProfileInsert = async (req, res) => {
    let allData = { ...req.body }
    if (req.file) {
        if (req.file.filename !== undefined, req.file.filename !== null, req.file.filename !== '') {
            allData['companyImage'] = req.file.filename
        }
    }
    let checkLength = await companyProfileModel.find()
    console.log(checkLength)
    if (checkLength.length == 0) {
        //insert
        let company = new companyProfileModel(allData)
        let companyRes = await company.save()
        res.send({
            status: 1,
            msg: 'compnay profile details',
            companyRes
        })
    }
    else {
        //update
        let companyRes = await companyProfileModel.updateOne({ _id: checkLength[0]._id }, { $set: allData })
        res.send({
            status: 1,
            msg: 'company details updated',
            companyRes
        })

    }
}

let companyProfileView = async (req, res) => {
    let companyDetails = await companyProfileModel.find()
    let staticPath = process.env.STATICPATH + '/uploads/company-profile/'
    res.send({
        status: 1,
        staticPath,
        msg: 'company profile data',
        companyDetails
    })
}



module.exports = { companyProfileInsert, companyProfileView }