const { Schema, default: mongoose } = require("mongoose");

const colorSchema = new Schema({
    colorName: {
        type: String,
        minlength: 3,
        maxlength: 15,
        required: true,
    },
    colorCode: String,
    colorStatus: Boolean,
    colorOrder: Number
}, { timestamps: true })

let colorModel = mongoose.model("color", colorSchema)

module.exports = { colorModel }