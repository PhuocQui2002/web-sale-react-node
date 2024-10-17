const mongoose = require("mongoose");

const sizeProductSchema = new mongoose.Schema(
  {
    nameSize: { type: String, required: true, unique: true },
    priceSize: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Size = mongoose.model("Size", sizeProductSchema);

module.exports = Size;
