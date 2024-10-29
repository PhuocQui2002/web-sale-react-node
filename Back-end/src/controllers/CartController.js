const CartService = require("../services/CartService");

const createCart = async (req, res) => {
  try {

    //console.log(req.body);
    const { userID, orderItems } = req.body;
    
    if (!userID) {
      return res.status(401).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    
    const response = await CartService.createCart(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getCartByUserId = async (req, res) => {
    try {
      const orderId = req.params.id;
      //console.log("orderId = req.params.id", orderId)
      if (!orderId) {
        return res.status(401).json({
          status: "ERR",
          message: "The userId is required",
        });
      }
      const response = await CartService.getCartByUserId(orderId);
      return res.status(200).json(response);
    } catch (e) {
      console.log(e);
      return res.status(404).json({
        message: e,
      });
    }
  };
  const deleteCart = async (req, res) => {
    try {
      const productId = req.params.id;
      if (!productId) {
        return res.status(200).json({
          status: "ERR",
          message: "The cartID is required",
        });
      }
      const response = await CartService.deleteCart(productId);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };
  const deleteOrderItemCart = async (req, res) => {
    try {
      const userID = req.params.userID; 
    const { orderItems } = req.body;
      //console.log("userID, orderItems", userID, orderItems)
      const response = await CartService.deleteOrderItemCart(userID, orderItems);
      return res.status(200).json(response);
    } catch (e) {
      // Handle any errors that occur
      return res.status(404).json({
        message: e.message || "An error occurred while deleting order items", 
      });
    }
  };
  
module.exports = {
  createCart,
  getCartByUserId,
  deleteCart,
  deleteOrderItemCart
};
