const Size = require("../models/SizeProduct");

const createSizeProduct = (newSize) => {
  return new Promise(async (resolve, reject) => {
    const { nameSize, priceSize } = newSize;
    try {
      const checkFrameProduct = await Size.findOne({
        nameSize: nameSize,
      });
      if (checkFrameProduct !== null) {
        resolve({
          status: "ERR",
          message: "The name of Frame product is already",
        });
      }
      const createSize = await Size.create({
        nameSize,
        priceSize,
      });
      if (createSize) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createSize,
        });
      }
    } catch (e) {
      console.error(e); // Log chi tiết lỗi nếu xảy ra
      return reject(e);
    }
  });
};

const getALLSize = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getALLSize = await Size.find().sort({ createdAt: -1, updatedAt: -1 });
      resolve({
        status: "OK",
        message: "Success",
        data: getALLSize,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
    createSizeProduct,
    getALLSize
};
