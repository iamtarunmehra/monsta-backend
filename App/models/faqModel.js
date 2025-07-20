const { Schema, default: mongoose } = require("mongoose");

let faqSchema = new Schema({
    question: ({
        type: String,
        required: true
    }),
    answer: String,
    faqStatus: Boolean,
    order: Number
}, { timestamps: true })

let faqModel = mongoose.model("faq", faqSchema)

module.exports = { faqModel }