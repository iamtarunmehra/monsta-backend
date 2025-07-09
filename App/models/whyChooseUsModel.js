const { Schema, default: mongoose } = require("mongoose");

let whyChooseUsSchema = new Schema({
    whyChooseUsImage: "string",
    whyChooseUsName: ({
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    }),
    whyChooseUsOrder: Number,
    whyChooseUsDes : String,
}, { timestamps: true })

let whyChooseUsModel =  mongoose.model('whyChooseUs',whyChooseUsSchema)

module.exports={whyChooseUsModel}