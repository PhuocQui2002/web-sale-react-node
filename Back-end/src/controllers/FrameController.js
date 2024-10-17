const FrameService = require("../services/FrameService");

const createFrameProduct = async (req, res) => {
  try {
    const { nameFrame, priceFrame } = req.body;
    if (!nameFrame || !priceFrame) {
      return res.status(401).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await FrameService.createFrameProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Something went wrong",
    });
  }
};

const getALLFrame = async (req, res) => {
  try {
    const response = await FrameService.getALLFrame();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createFrameProduct,
  getALLFrame,
};
