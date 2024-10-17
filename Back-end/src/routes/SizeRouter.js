const express = require("express");
const router = express.Router();
const SizeController = require('../controllers/SizeController');
const {
    authMiddleWare,
    authUserMiddleWare,
  } = require("../middleware/authMiddleware");

router.post("/create", SizeController.createSizeProduct);
router.get("/getAllSize", SizeController.getAllSize);



module.exports = router;
