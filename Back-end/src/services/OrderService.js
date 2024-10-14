const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      user,
      isPaid,
      paidAt,
      email,
    } = newOrder;
    try {
      //   const promises = orderItems.map(async (order) => {
      //     const productData = await Product.findOneAndUpdate(
      //       {
      //         _id: order.product,
      //         countInStock: { $gte: order.amount },
      //       },
      //       {
      //         $inc: {
      //           countInStock: -order.amount,
      //           selled: +order.amount,
      //         },
      //       },
      //       { new: true }
      //     );
      //     if (productData) {
      //       return {
      //         status: "OK",
      //         message: "SUCCESS",
      //       };
      //     } else {
      //       return {
      //         status: "OK",
      //         message: "ERR",
      //         id: order.product,
      //       };
      //     }
      //   });
      //   const results = await Promise.all(promises);
      //   const newData = results && results.filter((item) => item.id);
      //   if (newData.length) {
      //     const arrId = [];
      //     newData.forEach((item) => {
      //       arrId.push(item.id);
      //     });
      //     resolve({
      //       status: "ERR",
      //       message: `San pham voi id: ${arrId.join(",")} khong du hang`,
      //     });
      //   } else {
      const createdOrder = await Order.create({
        orderItems,
        shippingAddress: {
          fullName,
          address,
          city,
          phone,
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user: user,
        isPaid,
        paidAt,
      });
      if (createdOrder) {
        //   await EmailService.sendEmailCreateOrder(email, orderItems);
        resolve({
          status: "OK",
          message: "success",
          data: createdOrder,
        });
      }
      //}
    } catch (e) {
      //   console.log('e', e)
      reject(e);
    }
    console.log("new-order", newOrder);
  });
};

const addProductReview = async (req, res) => {
  try {
    
    const order = await Order.findById(req.params.orderId);
    console.log("addProductReview 2", order);
    // Kiểm tra nếu đơn hàng tồn tại và đã được giao
    if (order && order.isDelivered) {
      // Tìm sản phẩm trong danh sách orderItems
      const productItem = order.orderItems.find(
        (item) => item.product.toString() === req.body.productId
      );

      // Kiểm tra nếu sản phẩm này chưa được đánh giá
      if (productItem && !productItem.review) {
        // Cập nhật đánh giá sản phẩm
        productItem.review = {
          rating: req.body.rating,
          comment: req.body.comment,
          reviewedAt: Date.now(),
        };

        // Lưu lại thay đổi của đơn hàng
        await order.save();

        return res.status(201).json({ message: "Đánh giá thành công!" });
      } else {
        return res.status(400).json({ message: "Sản phẩm đã được đánh giá!" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Không thể đánh giá vì đơn hàng chưa được giao!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server controller", error: error.message });
  }
};
module.exports = {
  createOrder,
  addProductReview,
};
