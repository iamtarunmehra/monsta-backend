const { Schema, default: mongoose } = require("mongoose");

let countrySchema = new Schema({
    countryName: ({
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
        unique: true
    }),
    countryStatus: Boolean,
    countryOrder: Number
}, { timestamps: true })

let countryModel = mongoose.model("country", countrySchema)

module.exports = { countryModel }