const express = require("express");
const router = express.Router();
const CartController = require('../controllers/CartController');
const {
    authMiddleWare,
    authUserMiddleWare,
  } = require("../middleware/authMiddleware");

router.post("/createCart", CartController.createCart);
router.delete('/deleteCart/:id', CartController.deleteCart)
router.delete('/deleteOrderItemCart/:userID', CartController.deleteOrderItemCart);
router.get("/getCartByUserId/:id", CartController.getCartByUserId);







module.exports = router;
