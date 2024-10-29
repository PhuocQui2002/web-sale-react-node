const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userID: { type: String },
    orderItems: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        image: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        discount: { type: Number },
        size: { type: String },
        frame: { type: String },
        type: { type: String },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
