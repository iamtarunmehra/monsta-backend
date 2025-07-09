const { Schema, default: mongoose } = require("mongoose");

let sliderSchema = new Schema({
    sliderImage: String,
    sliderName: ({
        type: String,
        minlength: 3,
        maxlength: 25,
        required: true,
        unique: true
    }),
    sliderStatus: Boolean,
    sliderOrder: Number
}, { timestamps: true })

let sliderModel = mongoose.model('slider', sliderSchema)

module.exports = { sliderModel }