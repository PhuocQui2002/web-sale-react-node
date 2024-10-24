const EvaluateService = require("../services/EvaluateService");

const createEvaluate = async (req, res) => {
    try {
        
      const {
        commentEvaluate,
        ratingEvaluate,
        imgEvaluate,
      } = req.body;
      if (!commentEvaluate || !imgEvaluate)  {
        return res.status(401).json({
          status: "ERR",
          message: "The input is required",
        });
      }
      const response = await EvaluateService.createEvaluat(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json({  
        status: "ERR",
        message: e.message || "Something went wrong",
      });
    }
  };
const getAllEvaluate = async (req, res) => {
  try {
    const response = await EvaluateService.getALLEvaluate();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllOrderByProductId = async (req, res) => {
  try {
    const evaluateProductId = req.params.id;
    if (!evaluateProductId) {
      return res.status(401).json({
        status: "ERR",
        message: "The evaluateProductId is required",
      });
    }
    const response = await EvaluateService.getAllEvaluateById(evaluateProductId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

  
  module.exports = {
    createEvaluate,
    getAllEvaluate,
    getAllOrderByProductId
  };