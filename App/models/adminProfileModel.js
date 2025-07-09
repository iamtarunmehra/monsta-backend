const { Schema, default: mongoose } = require("mongoose");

let adminProfileSchema = new Schema({
    profileImage: String,
    profileName: String,
    profileEmail: String,
    profilePhone: String
}, { timestamps: true })

let adminProfileModel = mongoose.model('adminProfile', adminProfileSchema)

module.exports = { adminProfileModel }