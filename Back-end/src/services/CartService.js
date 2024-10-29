const Cart = require("../models/CartModel");

const createCart = (newCart) => {
  return new Promise(async (resolve, reject) => {
    const { userID, orderItems } = newCart;
    try {
      const existingCart = await Cart.findOne({ userID });
      if (existingCart) {
        orderItems.forEach((newItem) => {
          const existingItem = existingCart.orderItems.find(
            (item) =>
              item.name === newItem.name &&
              item.size === newItem.size &&
              item.frame === newItem.frame
          );
          if (existingItem) {
            existingItem.amount += newItem.amount;
          } else {
            existingCart.orderItems.push(newItem);
          }
        });

        await existingCart.save();
        resolve({
          status: "OK",
          message: "Cart updated successfully",
          data: existingCart,
        });
      } else {
        const cartCreate = await Cart.create({
          userID,
          orderItems,
        });
        resolve({
          status: "OK",
          message: "Cart created successfully",
          data: cartCreate,
        });
      }
    } catch (e) {
      console.error(e); // Log chi tiết lỗi nếu xảy ra
      return reject(e);
    }
  });
};

const getCartByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await Cart.find({
        userID: id,
      }).sort({ createdAt: -1, updatedAt: -1 });

      if (cart === null) {
        reject({
          status: "ERR",
          message: "The userID is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: cart,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteCart = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkCart = await Product.findOne({
        _id: id,
      });
      if (checkCart === null) {
        resolve({
          status: "ERR",
          message: "The cartID is not defined",
        });
      }

      await Cart.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete cartID success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteOrderItemCart = (userID, orderItems) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm giỏ hàng của người dùng
      console.log(userID);
      const existingCart = await Cart.findOne({ userID });

      if (!existingCart) {
        return resolve({
          status: "ERR",
          message: "Cart not found for this user",
        });
      }

      const updatedOrderItems = existingCart.orderItems.filter((item) => {
        return !orderItems.some(
          (orderItem) =>
            orderItem.name === item.name &&
            orderItem.size === item.size &&
            orderItem.frame === item.frame
        );
      });
      existingCart.orderItems = updatedOrderItems;
      await existingCart.save();
      resolve({
        status: "OK",
        message: "Order items removed successfully",
        data: existingCart,
      });
    } catch (e) {
      console.error(e); // Log chi tiết lỗi nếu xảy ra
      return reject(e);
    }
  });
};

module.exports = {
  createCart,
  getCartByUserId,
  deleteCart,
  deleteOrderItemCart,
};
