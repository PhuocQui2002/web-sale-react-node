const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');

const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', authUserMiddleWare, OrderController.createOrder)
// router.post('/:orderId/review', OrderController.getOrderById);
router.get('/getDetailsOrder/:id', OrderController.getDetailsOrder)
router.get('/getAllOrder/:id', OrderController.getAllOrder)
router.delete('/cancelOrder/:id', OrderController.cancelOrderDetails)
// router.get('/get-all-order',authMiddleWare, OrderController.getAllOrder)


module.exports = router