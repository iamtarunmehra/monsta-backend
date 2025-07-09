const { transporter } = require("../../config/mailConfig")
const { userModel } = require("../../models/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;
let jwt = require("jsonwebtoken")

let myOtp = new Map();

let userCreate = async (req, res) => {

    let { email, password, phone, userName } = req.body
    let obj = {
        userName,
        userEmail: email,
        userPhone: phone,
        userPassword: password,
    }
    try {
        const otp = String(Math.random() * 999999).slice(0, 4)

        myOtp.set(email, otp)  //key name - userEmail stored - otp

        const info = await transporter.sendMail({
            from: '"OTP mail" <tarunmehra80790@gmail.com>',
            to: email,
            subject: "OTP mail",
            text: "", // plain‑text body
            html: ` <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #FF5733;">Your OTP Code</h2>
                        <p>Use the following <b style="font-size: 24px; color: #000;">${otp}</b> to complete your verification.</p>
                        <p style="font-size: 14px; color: #777;">This OTP is valid for 10 minutes.</p>
                        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
                        <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
                    </div>`, // HTML body
        });
        res.send({
            status: 1,
            msg: "Otp Sent",
            // userRes
        })
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "User Email Is Already Exist !",
            error
        })
    }
}

let checkOtp = async (req, res) => {
    let { email, password, phone, otpValue, userName } = req.body
    let dbPassword = await bcrypt.hash(password, saltRounds)
    let obj = {
        userName,
        userEmail: email,
        userPhone: phone,
        userPassword: dbPassword
    }
    let storeOtp = myOtp.get(email)

    if (storeOtp === otpValue) {
        let user = await userModel(obj)
        let userRes = await user.save()
        res.send({
            status: 1,
            msg: "User Created",
            userRes
        })
    }
    else {
        res.send({
            status: 0,
            msg: "Invalid Otp try again later"
        })
    }
}

let userLogin = async (req, res) => {
    let { email, password, userName } = req.body

    let userData = await userModel.findOne({ userName })

    if (userData) {
        let convertedPassword = await bcrypt.compare(password, userData.userPassword);
        if (convertedPassword) {
            let userDataRes = {
                userEmail: userData.userEmail,
                _id: userData._id,
                userName: userName
            }
            let token = jwt.sign(userDataRes, process.env.TOKENKEY)
            res.send({
                status: 1,
                msg: "login successfully !",
                userDataRes,
                token
            })
        }

        else {
            res.send({
                status: 0,
                msg: "Invalid Password"
            })
        }
    }
    else {
        res.send({
            status: 0,
            msg: "Username Is Invalid"
        })
    }
}

let checkEmail = async (req, res) => {
    let { email } = req.body
    let userEmail = await userModel.findOne({ userEmail: email })
    if (userEmail) {
        const newOtp = String(Math.random() * 9999).slice(0, 4)
        const info = await transporter.sendMail({
            from: '"OTP mail" <tarunmehra80790@gmail.com>',
            to: email,
            subject: "OTP mail",
            text: "", // plain‑text body
            html: ` <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #FF5733;">Your OTP Code</h2>
                        <p>Use the following <b style="font-size: 24px; color: #000;">${newOtp}</b> to complete your verification.</p>
                        <p style="font-size: 14px; color: #777;">This OTP is valid for 10 minutes.</p>
                        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
                        <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
                    </div>`, // HTML body
        });

        myOtp.set(email, newOtp)
        res.send({
            status: 1,
            msg: "OTP SENT",
            userEmail
        })
    }
    else {
        res.send({
            status: 0,
            msg: "Email doesn't exist !"
        })
    }



}

let newOtpCheck = (req, res) => {

    let { email, otpValue } = req.body

    let storedOtp = myOtp.get(email)

    if (String(otpValue) === storedOtp) {
        res.send({
            status: 1,
            msg: "OTP VERIFIED"
        })
    }
    else {
        res.send({
            status: 0,
            msg: "OTP INVALID"
        })
    }
}

let resetPassword = async (req, res) => {
    let { newPassword } = req.body
    if (newPassword !== '') {
        let finalPassword = await bcrypt.hash(newPassword, saltRounds)
        let passwordRes = await userModel.updateOne({ userPassword: finalPassword })
        res.send({
            status: 1,
            msg: "password changed successfully",
            passwordRes
        })
    }
    else {
        res.send({
            status: 0,
            msg: "Please enter a new password"
        })
    }
}

let changePassword = async (req, res) => {
    let { oldPassword, newPassword, id } = req.body
    let currentUserData = await userModel.findOne({ _id: id })
    let dbPassword = currentUserData.userPassword
    let checkPassword = bcrypt.compareSync(oldPassword, dbPassword)
    let obj;
    if (checkPassword) {
        let hash = await bcrypt.hash(newPassword, saltRounds);
        let changePassword = await userModel.updateOne({ _id: id }, { $set: { userPassword: hash } })
        obj = {
            status: 1,
            msg: "Password Changed",
            changePassword
        }
    }
    else {
        obj = {
            status: 0,
            msg: "Invalid Old Password"
        }
    }
    res.send(obj)
}

let userCreateWithGoogle = async (req, res) => {
    let { userEmail, userPhone, verifyStatus } = req.body

    let checkEmail = await userModel.findOne({ userEmail: userEmail })

    let resObj;

    try {
        if (checkEmail) {
            let userRes = {
                userEmail: checkEmail.userEmail,
                userPhone: checkEmail.userPhone,
                id: checkEmail._id
            }
            let token = jwt.sign(userRes, process.env.TOKENKEY)
            resObj = {
                status: 1,
                msg: "user saved",
                userRes,
                token
            }
        }
        else {
            if (userPhone) {
                userPhone = userPhone
            }
            else {
                userPhone = 'Not Found'
            }
            let dbPassword = await bcrypt.hash(userEmail, saltRounds)
            let userData = {
                userEmail,
                userName: userEmail,
                userPhone,
                userPassword: dbPassword
            }
            let token = jwt.sign(userData, process.env.TOKENKEY)
            console.log(userData)
            let user = new userModel(userData)
            let userRes = await user.save()
            resObj = {
                status: 1,
                msg: 'user saved',
                userRes,
                token
            }
        }

    }
    catch (error) {
        resObj = {
            status: 0,
            msg: "Something went wrong !",
            icon: 'error'
        }
    }
    finally {
        res.send(resObj)
    }

}

module.exports = { userCreate, userLogin, checkOtp, checkEmail, newOtpCheck, resetPassword, changePassword, userCreateWithGoogle }