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
      //city,
      phone,
      user,
      isPaid,
      paidAt,
      email,
    } = newOrder;
    try {
      const promises = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: -order.amount,
              selled: +order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          return {
            status: "OK",
            message: "SUCCESS",
          };
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
      console.log("results", results);
      const newData = results && results.filter((item) => item.id);
      if (newData.length) {
        const arrId = [];
        newData.forEach((item) => {
          arrId.push(item.id);
        });
        reject({
          status: "ERR",
          message: `San pham voi id: ${arrId.join(",")} khong du hang`,
        });
      } else {
        const createdOrder = await Order.create({
          orderItems,
          shippingAddress: {
            fullName,
            address,
            //city,
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
        // if (createdOrder) {
        //     await EmailService.sendEmailCreateOrder(email,orderItems)
        //     resolve({
        //         status: 'OK',
        //         message: 'success'
        //     })
        // }
      }
    } catch (e) {
      //   console.log('e', e)
      reject(e);
    }
  });
};

const getAllOrderByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      //console.log('order', order)
      if (order === null) {
        reject({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
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

const getOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        ///id order
        _id: id,
      });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};

const cancelOrderDetails = (id, data) => {
  return new Promise(async (resolve, reject) => {
      try {
          let order = []
          const promises = data.map(async (order) => {
              const productData = await Product.findOneAndUpdate(
                  {
                  _id: order.product,
                  selled: {$gte: order.amount}
                  },
                  {$inc: {
                      countInStock: +order.amount,
                      selled: -order.amount
                  }},
                  {new: true}
              )
              if(productData) {
                  order = await Order.findByIdAndDelete(id)
                  if (order === null) {
                      resolve({
                          status: 'ERR',
                          message: 'The order is not defined'
                      })
                  }
              } else {
                  return{
                      status: 'OK',
                      message: 'ERR',
                      id: order.product
                  }
              }
          })
          const results = await Promise.all(promises)
          const newData = results && results[0] && results[0].id
          
          if(newData) {
              resolve({
                  status: 'ERR',
                  message: `San pham voi id: ${newData} khong ton tai`
              })
          }
          resolve({
              status: 'OK',
              message: 'success',
              data: order
          })
      } catch (e) {
          reject(e)
      }
  })
}

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
      try {
          const allOrder = await Order.find().sort({createdAt: -1, updatedAt: -1})
          resolve({
              status: 'OK',
              message: 'Success',
              data: allOrder
          })
      } catch (e) {
          reject(e)
      }
  })
}

const updateOrder = (orderID, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({
        _id: orderID,
      });
      if (checkOrder === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      const updatedOrder = await Order.findByIdAndUpdate(orderID, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createOrder,
  addProductReview,
  getAllOrderByUserId,
  getOrderDetails,
  cancelOrderDetails,
  getAllOrder,
  updateOrder
};
