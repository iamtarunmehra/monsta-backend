const { Schema, default: mongoose } = require("mongoose");

let adminSchema = new Schema(({
    admin_username: ({
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    }),
    admin_password: String
}))

let adminModel = mongoose.model('admin', adminSchema)

module.exports = { adminModel }