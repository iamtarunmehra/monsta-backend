const { Schema, default: mongoose } = require("mongoose");

let testimonialSchema = new Schema({
    testimonialName: ({
        type: String,
        minlength: 3,
        maxlength: 40,
        required: true,
    }),
    testimonialImage: String,
    testimonialDesignation: String,
    testimonialRating: Number,
    testomonialStatus: Boolean,
    testimonialOrder: Number,
    testimonialDescription: String
}, { timestamps: true })

let testimonialModel = mongoose.model('testimonial', testimonialSchema)

module.exports = { testimonialModel }