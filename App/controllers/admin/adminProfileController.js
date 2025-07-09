const { adminProfileModel } = require("../../models/adminProfileModel")

let profileInsert = async (req, res) => {
    let allData = { ...req.body }
    console.log(req.file.filename)
    if (req.file) {
        if (req.file.filename !== undefined && req.file.filename !== null && req.file.filename !== '') {
            allData['profileImage'] = req.file.filename
        }
    }
    let adminData = await adminProfileModel.find()
    if (adminData.length == 0) {
        //insert profile
        let profile = new adminProfileModel(allData)
        let profileRes = await profile.save()
        console.log(allData)
        res.send({
            status: 1,
            msg: 'profile created',
            profileRes
        })
    }
    else {
        //update profile
        let profileRes = await adminProfileModel.updateOne({ _id: adminData[0]._id }, { $set: allData })
        res.send({
            status: 1,
            msg: 'profile updated',
            profileRes
        })
    }
}

let profileView = async (req, res) => {
    let profileData = await adminProfileModel.find()
    let staticPath = process.env.STATICPATH + process.env.PORT + '/uploads/profile/'
    res.send({
        status: 1,
        staticPath,
        msg: 'profile data',
        profileData
    })
}

module.exports = { profileInsert, profileView }