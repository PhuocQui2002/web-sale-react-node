const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    console.log(req.body)
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

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Lấy orderId từ params
    console.log("Order ID:", orderId); // In ra orderId để kiểm tra

    const order = await Order.findById(orderId); // Tìm đơn hàng theo ID

    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại." });
    }

    res.status(200).json(order); // Trả về thông tin đơn hàng
  } catch (error) {
    console.error("Lỗi:", error); // In lỗi ra console
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  createOrder,
  addProductReview,
  getOrderById,
};
