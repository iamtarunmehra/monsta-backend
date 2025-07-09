const { Schema, default: mongoose } = require("mongoose");

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      minlength: 3,
      maxlength: 15,
      required: true,
      unique: true,
    },
    categoryImage: String,
    categoryCode: String,
    categoryStatus: Boolean,
    categoryOrder: Number,
  },
  {
    timestamps: true,
  }
);

let categoryModel = mongoose.model("category", categorySchema);

module.exports = { categoryModel };
