const Evaluat = require("../models/EvaluateModel");

const createEvaluat = (newEvaluat) => {
  return new Promise(async (resolve, reject) => {
    const { commentEvaluate, ratingEvaluate, imgEvaluate, idProduct, userId } =
      newEvaluat;
    try {
      const createEvaluat = await Evaluat.create({
        commentEvaluate,
        ratingEvaluate,
        imgEvaluate,
        idProduct,
        userId,
      });
      if (createEvaluat) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createEvaluat,
        });
      }
    } catch (e) {
      console.error(e); // Log chi tiết lỗi nếu xảy ra
      return reject(e);
    }
  });
};

const getALLEvaluate = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getALLEvaluate = await Evaluat.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });
      resolve({
        status: "OK",
        message: "Success",
        data: getALLEvaluate,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllEvaluateById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderProductID = await Evaluat.find({
        idProduct: id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      console.log(orderProductID);
      if ( orderProductID.length === 0) {
        reject({
          status: "ERR",
          message: "The orderProductID is not defined",
        });
      }
      else{
        resolve({
          status: "OK",
          message: "SUCESSS",
          data: orderProductID,
        });
      }
      
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};

module.exports = {
  createEvaluat,
  getALLEvaluate,
  getAllEvaluateById,
};
