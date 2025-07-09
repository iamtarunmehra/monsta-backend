const { Schema, default: mongoose } = require("mongoose");

let companyProfileSchema = new Schema({
    companyImage: String,
    companyName: String,
    companyEmail: String,
    companyPhone: String,
    companyAddress: String,
    companyGoogleMapUrl: String
}, { timestamps: true })

let companyProfileModel = mongoose.model('companyProfile', companyProfileSchema)

module.exports = { companyProfileModel }

