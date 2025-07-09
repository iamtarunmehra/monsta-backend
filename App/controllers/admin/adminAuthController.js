const { adminModel } = require("../../models/adminModel");

let adminLogin = async (req, res) => {
    let { userName, userPassword } = req.body
    let data = await adminModel.findOne({ admin_username: userName, admin_password: userPassword })
    let obj;
    if (data) {
        obj = {
            status: 1,
            msg: "Login Successfully !",
            data
        }
    }
    else {
        obj = {
            status: 0,
            msg: "Invalid Username or Password"
        }
    }
    res.send(obj)
    console.log(obj)
}

let changePassword = async (req, res) => {
    let { oldPassword, newPassword, } = req.body
    let { adminId } = req.params
    console.log(adminId)

    let checkOld = await adminModel.findOne({ _id: adminId, admin_password: oldPassword })
    let obj;

    if (checkOld) {
        let changePass = await adminModel.updateOne({ _id: adminId }, { $set: { admin_password: newPassword } })
        obj = {
            status: 1,
            msg: "password changed successfully !",
            changePass
        }
    }

    else {
        obj = {
            status: 0,
            msg: "Invalid Old Password !",
        }
    }

    res.send(obj)
}

module.exports = { adminLogin, changePassword }