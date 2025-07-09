const { Schema, default: mongoose } = require("mongoose");

let materialSchema = new Schema({
    materialName: ({
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true
    }),
    materialStatus: Boolean,
    materialOrder: Number
}, { timestamps: true })

let materialModel = mongoose.model("material", materialSchema)

module.exports = { materialModel }