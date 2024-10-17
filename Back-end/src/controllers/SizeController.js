const SizeService = require("../services/SizeService");

const createSizeProduct = async (req, res) => {
    try {
      const {
        nameSize,
        priceSize,
      } = req.body;
      if (!nameSize || !priceSize) {
        return res.status(401).json({
          status: "ERR",
          message: "The input is required",
        });
      }
      const response = await SizeService.createSizeProduct(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json({  
        status: "ERR",
        message: e.message || "Something went wrong",
      });
    }
  };

  const getAllSize = async (req, res) => {
    try {
      const response = await SizeService.getALLSize();
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

  module.exports = {
    createSizeProduct,
    getAllSize
  };