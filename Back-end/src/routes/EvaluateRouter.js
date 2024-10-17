const express = require("express");
const router = express.Router();
const EvaluateController = require('../controllers/EvaluateController');
const {
    authMiddleWare,
    authUserMiddleWare,
  } = require("../middleware/authMiddleware");

router.post("/create", EvaluateController.createEvaluate);
router.get("/getAllEvaluate", EvaluateController.getAllEvaluate);



module.exports = router;
