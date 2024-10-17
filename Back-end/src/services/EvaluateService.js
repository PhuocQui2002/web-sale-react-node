const Evaluat = require("../models/EvaluateModel");

const createEvaluat = (newEvaluat) => {
  return new Promise(async (resolve, reject) => {
    const { commentEvaluate, ratingEvaluate, imgEvaluate } = newEvaluat;
    try {
      const checkEvaluat = await Evaluat.findOne({
        commentEvaluate: commentEvaluate,
      });
      if (checkEvaluat !== null) {
        resolve({
          status: "ERR",
          message: "The name of evaluate is already",
        });
      }
      const createEvaluat = await Evaluat.create({
        commentEvaluate,
        ratingEvaluate,
        imgEvaluate,
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

module.exports = {
  createEvaluat,
  getALLEvaluate,
};
