const mongoose = require("mongoose");

const frameProductSchema = new mongoose.Schema(
  {
    nameFrame: { type: String, required: true, unique: true },
    priceFrame: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Frame = mongoose.model("Frame", frameProductSchema);

module.exports = Frame;
