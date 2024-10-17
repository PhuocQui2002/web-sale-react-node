const mongoose = require("mongoose");

const evaluateSchema = new mongoose.Schema(
  {
    ratingEvaluate: { type: Number, min: 1, max: 5 },
    commentEvaluate: { type: String },
    imgEvaluate: { type: String },
  },
  {
    timestamps: true,
  }
);
const Evaluate = mongoose.model("Evaluate", evaluateSchema);

module.exports = Evaluate;
