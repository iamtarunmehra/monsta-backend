const { Schema, default: mongoose } = require("mongoose");

let userSchema = new Schema({
    userName: String,
    userEmail: ({
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
        unique: true
    }),
    userPassword: ({
        required: true,
        type: String
    }),
    userPhone: ({
        type: String,
        required: true
    }),
}, { timestamps: true })

let userModel = mongoose.model("user", userSchema)

module.exports = { userModel }