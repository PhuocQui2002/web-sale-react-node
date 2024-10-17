const express = require("express");
const router = express.Router();
const FrameController = require('../controllers/FrameController');
const {
    authMiddleWare,
    authUserMiddleWare,
  } = require("../middleware/authMiddleware");

router.post("/create", FrameController.createFrameProduct);
router.get("/getFrame", FrameController.getALLFrame);


module.exports = router;
