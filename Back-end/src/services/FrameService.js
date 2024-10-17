const Frame = require("../models/FrameProduct");

const createFrameProduct = (newFrame) => {
  return new Promise(async (resolve, reject) => {
    const { nameFrame, priceFrame } = newFrame;
    try {
      const checkFrameProduct = await Frame.findOne({
        nameFrame: nameFrame,
      });
      if (checkFrameProduct !== null) {
        resolve({
          status: "ERR",
          message: "The name of Frame product is already",
        });
      }
      const createFrame = await Frame.create({
        nameFrame,
        priceFrame,
      });
      if (createFrame) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createFrame,
        });
      }
    } catch (e) {
      console.error(e); // Log chi tiết lỗi nếu xảy ra
      return reject(e);
    }
  });
};

const getALLFrame = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getALLFrame = await Frame.find().sort({ createdAt: -1, updatedAt: -1 });
      resolve({
        status: "OK",
        message: "Success",
        data: getALLFrame,
      });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  createFrameProduct,
  getALLFrame
  
};
