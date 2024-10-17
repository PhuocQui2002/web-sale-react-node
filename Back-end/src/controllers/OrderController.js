const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    console.log(req.body);
    const {
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
    } = req.body;
    if (
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalPrice ||
      !fullName ||
      !address ||
      !city ||
      !phone
    ) {
      return res.status(401).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    //console.log("orderId = req.params.id", orderId)
    if (!orderId) {
      return res.status(401).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getAllOrder(orderId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const addProductReview = async (req, res) => {
  try {
    console.log("addProductReview", req.params.orderId);
    const productId = req.params.orderId;
    if (order && order.isDelivered) {
      const productItem = order.orderItems.find(
        (item) => item.product.toString() === req.body.productId
      );

      if (productItem && !productItem.review) {
        // Cập nhật đánh giá sản phẩm
        productItem.review = {
          rating: req.body.rating,
          comment: req.body.comment,
          reviewedAt: Date.now(),
        };

        await order.save();
        res.status(201).json({ message: "Đánh giá thành công!" });
      } else {
        res.status(400).json({ message: "Sản phẩm đã được đánh giá!" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Không thể đánh giá vì đơn hàng chưa được giao!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi server controller", error: error.message });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
      const orderId = req.params.id
      if (!orderId) {
          return res.status(200).json({
              status: 'ERR',
              message: 'The userId is required'
          })
      }
      const response = await OrderService.getOrderDetails(orderId)
      return res.status(200).json(response)
  } catch (e) {
      // console.log(e)
      return res.status(404).json({
          message: e
      })
  }
}
module.exports = {
  createOrder,
  addProductReview,
  getDetailsOrder,
  getAllOrder,
};
